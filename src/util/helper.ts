var fs = require('fs');
import {handler} from './handler';
import {routeItem} from '../model/routeItem';
import { data } from "./data";

export class helper {
    public static parseRequest(path:string):routeItem {
        let temp = path.split('/');
        temp.shift();
        return helper.createRoute(temp);
    }
    
    private static createRoute(req:string[]):routeItem {
        console.log(req);
        return new routeItem({ 
            controller : req[0],
            method : req.length>1 ? req[1] : ""
        });
    }
    
    public static loadConfig(path:string): {} {
        let contents = JSON.parse(fs.readFileSync(path));
        return contents;
    }
    
    public static loadHandlers() {
        var files = fs.readdirSync(__dirname + "/../routes");
        for (var i=0; i<files.length; i++) {
            let _className = helper.getValidClassName(files[i]);
            if (null == _className) continue;
            console.log(_className + " registered");
            let _instance = helper.getClassByFileName(handler, _className, "routes");
            if (_instance != null) {
                handler.register(_instance, _className);
            }
        }
    }
    private static getValidClassName(name:string) : string {
        if (name.indexOf(".ts") !== -1) {
            return name.replace(".ts", "");
        }
        return null;
    }
    private static getClassByFileName<T>(t:T, name:string, folder:string) : T {
        return new (require(__dirname + "/../" + folder + "/" + name)[name])();
    }
    public static loadDataSource():any {
        if (global["config"]["datasource"]) {
            let _className = helper.getValidClassName(global["config"]["datasource"] + ".ts");
            let _instance = helper.getClassByFileName(data, _className, "data");
            return _instance;
        }
        return null;
    }
}