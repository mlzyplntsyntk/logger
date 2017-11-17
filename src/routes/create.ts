import {handler} from '../util/handler';

export class create extends handler {
    //curl -d "key=app&data[0][id]=1&data[0][name]=emre&" -X POST http://localhost:1152/create
    //curl -d "name=project-x" -X POST http://localhost:1152/project/create
    //curl -d "key=sv8zxF8BANvvvxVgM4VE" -X POST http://localhost:1152/project
    async respond(req:{}): Promise<{}> {
        return req["data"] || global["config"];
    }
}