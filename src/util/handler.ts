import {routeItem} from '../model/routeItem';
class _Tuples {
    [key:string]:any;
}
export abstract class handler {
    route:routeItem;
    
    private static handlers:_Tuples = new _Tuples();
    private static instances:_Tuples = new _Tuples();

    abstract async respond(req:{}):Promise<{}>;
    
    
    public static register<T>(t:T, name:string) {
        if (typeof this.handlers[name] === "undefined") {
            this.handlers[name] = t;
        }
    }
    
    static getByName(name:string):handler {
        return this.handlers[name];
    }
}