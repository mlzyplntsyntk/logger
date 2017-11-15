import * as bodyParser from "body-parser";
import * as express from "express";

import {handler} from './util/handler';
import {helper} from './util/helper';

let app:express.Application = express();
global["config"] = helper.loadConfig(__dirname + "/config.json"); 
helper.loadHandlers();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

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
            let requestParser = helper.parseRequest(req.path);
            let responder = handler.getByName(requestParser[0]);
            res.json(responder.respond(req.body));
        } catch (e) {
            console.log(e);
            res.end();
        } 
});

//if script does not executed by iis, fallback to custom port
if (!process.env.PORT) {
    if (process.argv.length>2) {
        process.env.PORT = process.argv[2];
    } else {
        process.env.PORT = 1151; 
    }
    
}

app.listen(process.env.PORT, (err)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log("app listening on port " + process.env.PORT);
});
module.exports = app;
