import {handler} from '../util/handler';
import {helper} from '../util/helper';
import { dataResultItem } from "../model/dataResultItem";

export class project extends handler {
    
    async respond(req:{}): Promise<{}> { 
        switch (this.route.method) {
            case "create":
                let result = await this.create(req["name"]);
                return result;
            default : 
                return await this.checkIndex(req["key"]);
        }
    }
    
    async create(name:string):Promise<{}> {
        let result = await handler.datasource.query("create", {
            index : "globals",
            type : "keys",
            id : name,
            body : {
                name : name
            }
        });
        return new Promise((resolve)=>{
            resolve(result);
        });
    }
    
    async checkIndex(index:string):Promise<{}> {
        return new Promise((resolve)=>{
            resolve(handler.datasource.getItemById("globals/keys", index));
        });
    }
    
}