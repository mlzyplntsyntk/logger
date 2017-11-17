"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var handler_1 = require("./handler");
var routeItem_1 = require("../model/routeItem");
var data_1 = require("./data");
var helper = (function () {
    function helper() {
    }
    helper.parseRequest = function (path) {
        var temp = path.split('/');
        temp.shift();
        return helper.createRoute(temp);
    };
    helper.createRoute = function (req) {
        console.log(req);
        return new routeItem_1.routeItem({
            controller: req[0],
            method: req.length > 1 ? req[1] : ""
        });
    };
    helper.loadConfig = function (path) {
        var contents = JSON.parse(fs.readFileSync(path));
        return contents;
    };
    helper.loadHandlers = function () {
        var files = fs.readdirSync(__dirname + "/../routes");
        for (var i = 0; i < files.length; i++) {
            var _className = helper.getValidClassName(files[i]);
            if (null == _className)
                continue;
            console.log(_className + " registered");
            var _instance = helper.getClassByFileName(handler_1.handler, _className, "routes");
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
    helper.getClassByFileName = function (t, name, folder) {
        return new (require(__dirname + "/../" + folder + "/" + name)[name])();
    };
    helper.loadDataSource = function () {
        if (global["config"]["datasource"]) {
            var _className = helper.getValidClassName(global["config"]["datasource"] + ".ts");
            var _instance = helper.getClassByFileName(data_1.data, _className, "data");
            return _instance;
        }
        return null;
    };
    return helper;
}());
exports.helper = helper;
