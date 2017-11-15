import {handler} from '../util/handler';

export class log extends handler {
    hits:number=0;

    respond(req:{}): {} { 
        return {
            hi : this.hits++
        };
    }
}