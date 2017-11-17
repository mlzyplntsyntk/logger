import { dataResultItem } from "../model/dataResultItem";

export abstract class data {
    abstract configure();
    // TODO Implement all project specific abstract methods
    abstract async getItemById(route:string, key:string) : Promise<dataResultItem>;
    abstract async createNewIndex(route:string, props:{}) : Promise<dataResultItem>;
    abstract async createUniqueIndex(route:string, name:string) : Promise<dataResultItem>;
    abstract async query(route:string, props:{}) : Promise<dataResultItem>;
}