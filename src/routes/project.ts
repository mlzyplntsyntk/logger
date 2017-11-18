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
    /**
     * TODO : this create feature should not be like this
     * we should be aware of different db systems, and design 
     * the abstract class to fit them all
     * @param name
     */
    async create(name:string):Promise<{}> {
       /**
        * here we call the create function, this should be applied to all
        * data sources. index is the db, type is the table and 
        * id is the primary key. body will be representing other fields.
        * 
        * the other specific field informations should be in
        * another class, which represents field types.
        */
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
    
    async checkIndex(index:string):Promise<any> {
        return new Promise((resolve)=>{
            resolve();
        });
    }
    
}