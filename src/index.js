"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').exec;
var bodyParser = require("body-parser");
var express = require("express");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var handler_1 = require("./util/handler");
var helper_1 = require("./util/helper");
var app = express();
app.prototype.loaded = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global["config"] = helper_1.helper.loadConfig(__dirname + "/../config.json");
helper_1.helper.loadHandlers();
handler_1.handler.datasource = helper_1.helper.loadDataSource();
handler_1.handler.datasource.configure();
app.use(function (req, res, next) {
    req.socket.on("error", function (e) {
        console.log(e);
    });
    next();
});
app.use(function (req, res, next) {
    try {
        var requestParser = helper_1.helper.parseRequest(req.path);
        var responder_1 = handler_1.handler.getByName(requestParser.controller);
        responder_1.route = requestParser;
        async(function () {
            return responder_1.respond(req.body);
        })()
            .then(function (result) {
            res.json(result);
        })
            .catch(next);
    }
    catch (e) {
        console.log(helper_1.helper.parseRequest(req.path));
        console.log(e);
        res.end();
    }
});
if (!process.env.PORT) {
    if (process.argv.length > 2) {
        process.env.PORT = process.argv[2];
    }
    else {
        process.env.PORT = "1151";
    }
}
app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("app listening on port " + process.env.PORT);
    exec("npm test", function (error, stdout, stderr) {
        if (error) {
            console.error("exec error: " + error);
            return;
        }
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
    });
});
module.exports = app;
