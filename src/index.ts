const { exec } = require('child_process');
import * as bodyParser from "body-parser";
import * as express from "express";
var async = require('asyncawait/async');
var await = require('asyncawait/await');

import {handler} from './util/handler';
import {helper} from './util/helper';
import { data } from "./util/data";

let app:express.Application = express();
app.prototype.loaded = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
global["config"] = helper.loadConfig(__dirname + "/../config.json");
helper.loadHandlers(); 
handler.datasource = helper.loadDataSource();
handler.datasource.configure();

app.use(function(req, res, next) {
    req.socket.on("error", function(e) {
        console.log(e);
    });
    next();
});
app.use((req:express.Request,
    res:express.Response,
    next:express.NextFunction) => {
        try {
           /**
            * TODO : before the response, let's check if this
            * requester is valid or not
            */
            
            
            
            let requestParser = helper.parseRequest(req.path);
            let responder = handler.getByName(requestParser.controller);
            responder.route = requestParser;
            
            async(function() {
                return responder.respond(req.body);
            })()
            .then(function (result) {
                res.json(result);
            })
            .catch(next);
            
        } catch (e) {
            console.log(helper.parseRequest(req.path));
            console.log(e);
            res.end();
        } 
});
//if script is not executed by iis, fallback to custom port
if (!process.env.PORT) {
    if (process.argv.length>2) {
        process.env.PORT = process.argv[2];
    } else {
        process.env.PORT = "1151"; 
    }
}

app.listen(process.env.PORT, (err)=>{
    
    if (err) {
        console.log(err);
        return;
    } 
    console.log("app listening on port " + process.env.PORT);
    
    
    exec("nyc mocha --timeout 10000", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`${stdout}`);
          console.log(`${stderr}`);
        });
});
module.exports = app;
