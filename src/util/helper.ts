var fs = require('fs');
import {handler} from './handler';

export class helper {
    public static parseRequest(path:string):{} {
        let temp = path.split('/');
        temp.shift();
        return temp;
    }
    
    public static loadConfig(path:string): {} {
        let contents = JSON.parse(fs.readFileSync(path));
        return contents;
    }
    
    public static loadHandlers() {
        console.log(__dirname + "/../routes");
        var files = fs.readdirSync(__dirname + "/../routes");
        for (var i=0; i<files.length; i++) {
            let _className = helper.getValidClassName(files[i]);
            if (null == _className) continue;
        
            let _instance = helper.getClassByFileName(_className);
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
    private static getClassByFileName(name:string) : handler {
        return new (require(__dirname + "/../routes/" + name)[name])();
    }
}