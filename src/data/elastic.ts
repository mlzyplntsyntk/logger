import {data} from '../util/data';
import { dataResultItem } from "../model/dataResultItem";
var elasticsearch = require('elasticsearch');

export class elastic extends data {
    client:any;    

    async connect() : Promise<dataResultItem> {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200'
        });
        return new Promise<dataResultItem>((resolve)=>{
            this.client.ping({
                requestTimeout: 1000
            }, function (error) {
                if (error) {
                    resolve(new dataResultItem({
                        status : false,
                        data : error
                    }));
                    return;
                } 
                //TODO remove this according to environment
                this.test();
                
                resolve(dataResultItem.success());
            });
        });
    }
    
    async query(body:string, params:any) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            this.client[body](params, (err, resp)=>{
                let result = new dataResultItem({
                    status : err ? false : true,
                    message : err ? err.message : "",
                    data : err || resp
                });
                resolve(result);
            }); 
        });
    }
        
    async disconnect() : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            resolve(dataResultItem.success());
        })
    }
    
    async createProject(name:string) : Promise<dataResultItem> {
        let indiceCheck = await this.client.indices.exists({
            index : name
        });
        let projectCheck = await this.query("globals/keys", {
            name : name
        });
        return new Promise<dataResultItem>((resolve)=>{
            if (indiceCheck && projectCheck.data.hits.total > 0) {
                resolve(new dataResultItem({
                    status : false,
                    message : "app exists"
                }));
                return;
            }
            return this.clearAndCreate(name, indiceCheck, projectCheck.data.hits.total);
        });
    }
    
    private async clearAndCreate(name:string
            , indiceCheck:boolean
            , total:number): Promise<dataResultItem> {
        if (indiceCheck) {
            await this.client.indices.delete({index:name});
        }
        if (total > 0) {
            await this.deleteIndex("globals/keys", { name : name });
        }
        return new Promise<dataResultItem>((resolve)=>{
            
        });
    }
    
    async getItemById(route:string, key:string) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            let parsed = route.split("/");
            let result = this.query("get", {
                index : parsed[0],
                type : parsed[1],
                id : key
            });
            resolve(result);
        });
    }

    async createNewIndex(route:string, props:{}) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            let parsed = route.split("/");
            let result = this.query("index", {
                index : parsed[0],
                type : parsed[1],
                body : props
            });
            resolve(result);
        });
    }
    
    async createUniqueIndex(route:string, name:string) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            let parsed = route.split("/");
            let result = this.query("create", {
                index : parsed[0],
                type : parsed[1],
                id : name,
                body : {
                    name : name
                }
            });
            resolve(result);
        });
    }
    
    async deleteIndex(route:string, props:{}) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            let parsed = route.split("/");
            let result = this.query("delete", {
                index : parsed[0],
                type : parsed[1],
                body : props
            });
            resolve(result);
        });
    }

    async checkKeyword(route:string, props:{}) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            let parsed = route.split("/");
            let result = this.query("search", {
                index : parsed[0],
                type : parsed[1],
                body : {
                    "query" : {
                        "constant_score" : {
                            "filter" : {
                                "term" : props
                            }
                        }
                    } 
                }
            });
            resolve(result);
        });
    }
    
    private test() {
        this.client.indices.delete({
            index : "*"
        }, ()=>{
            this.client.indices.create({
                index : "globals"
            }, ()=>{
                this.client.indices.putMapping({
                    index : "globals", 
                    type : "keys",
                    body : {
                        properties : {
                            name : {
                                type : "keyword"
                            }
                        }
                    }
                }, ()=>{
                   
                });
            });
        });
    }
    
}