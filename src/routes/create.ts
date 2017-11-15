import {handler} from '../util/handler';

export class create extends handler {
    //curl -d "key=app&data[0][id]=1&data[0][name]=emre&" -X POST http://localhost:1151/create
    respond(req:{}): {} {
        return req["data"] || global["config"];
    }
}