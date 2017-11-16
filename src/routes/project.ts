import {handler} from '../util/handler';
import {helper} from '../util/helper';

export class project extends handler {
    async respond(req:{}): Promise<{}> { 
        switch (this.route.method) {
            case "create":
                
                break;
            default : 
                return await this.checkIndex(req["key"]);
        }
    }
    
    async checkIndex(index:string):Promise<{}> {
        return new Promise((resolve)=>{
            global["client"].get({
                index : "global",
                type : "keys",
                id : index
            }, (err, resp)=>{
                if (err) {resolve(err)}
                else { resolve(resp); }
            }); 
        });
    }
}