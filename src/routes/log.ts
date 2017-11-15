import {handler} from '../util/handler';

export class log extends handler {
    hits:number=0;

    async respond(req:{}): Promise<{}> { 
        return await this.makeIndex(); 
    }
    
    async makeIndex():Promise<any> {
        return new Promise<any>((resolve)=>{
            global["client"].index({
                index : "global",
                type : "keys",
                body : {
                    name : "Beloororos"
                }
            }, (err, resp)=>{
                if (err) {resolve(err)}
                else { resolve(resp); }
            }); 
        });
    }
}