import { dataResultItem } from "../model/dataResultItem";
import { model } from "./model";

export abstract class data {
    abstract async connect():Promise<dataResultItem>;
    
    abstract async query(query:string, parameters:any|null):Promise<dataResultItem>;
    
    abstract async disconnect():Promise<dataResultItem>;
}