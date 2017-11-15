"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var handler_1 = require("./handler");
var helper = (function () {
    function helper() {
    }
    helper.parseRequest = function (path) {
        var temp = path.split('/');
        temp.shift();
        return temp;
    };
    helper.loadConfig = function (path) {
        var contents = JSON.parse(fs.readFileSync(path));
        return contents;
    };
    helper.loadHandlers = function () {
        console.log(__dirname + "/../routes");
        var files = fs.readdirSync(__dirname + "/../routes");
        for (var i = 0; i < files.length; i++) {
            var _className = helper.getValidClassName(files[i]);
            if (null == _className)
                continue;
            var _instance = helper.getClassByFileName(_className);
            if (_instance != null) {
                handler_1.handler.register(_instance, _className);
            }
        }
    };
    helper.getValidClassName = function (name) {
        if (name.indexOf(".ts") !== -1) {
            return name.replace(".ts", "");
        }
        return null;
    };
    helper.getClassByFileName = function (name) {
        return new (require(__dirname + "/../routes/" + name)[name])();
    };
    return helper;
}());
exports.helper = helper;
