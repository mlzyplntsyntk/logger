"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var handler_1 = require("./util/handler");
var helper_1 = require("./util/helper");
var app = express();
global["config"] = helper_1.helper.loadConfig(__dirname + "/config.json");
helper_1.helper.loadHandlers();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    req.socket.on("error", function (e) {
        console.log(e);
    });
    next();
});
app.use(function (req, res, next) {
    try {
        var requestParser = helper_1.helper.parseRequest(req.path);
        var responder = handler_1.handler.getByName(requestParser[0]);
        res.json(responder.respond(req.body));
    }
    catch (e) {
        console.log(e);
        res.end();
    }
});
if (!process.env.PORT) {
    if (process.argv.length > 2) {
        process.env.PORT = process.argv[2];
    }
    else {
        process.env.PORT = 1151;
    }
}
app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("app listening on port " + process.env.PORT);
});
module.exports = app;
