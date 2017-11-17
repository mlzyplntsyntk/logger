import {data} from '../util/data';
import { dataResultItem } from "../model/dataResultItem";
var elasticsearch = require('elasticsearch');

export class elastic extends data {
    client:any;    

    configure() {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
            //log: 'trace'
        });
        this.client.ping({
            requestTimeout: 1000
          }, function (error) {
            if (error) 
              console.trace(error);
          });
        
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
            let result = this.executeCommand("get", {
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
            let result = this.executeCommand("index", {
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
            let result = this.executeCommand("create", {
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
            let result = this.executeCommand("delete", {
                index : parsed[0],
                type : parsed[1],
                body : props
            });
            resolve(result);
        });
    }

    async query(route:string, props:{}) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            let parsed = route.split("/");
            let result = this.executeCommand("search", {
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
    
    private async executeCommand(commandType:string, cmd:{}) : Promise<dataResultItem> {
        return new Promise<dataResultItem>((resolve)=>{
            this.client[commandType](cmd, (err, resp)=>{
                let result = new dataResultItem({
                    status : err ? false : true,
                    message : err ? err.message : "",
                    data : err || resp
                });
                resolve(result);
            }); 
        });
    }
}