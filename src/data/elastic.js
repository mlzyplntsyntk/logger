"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../util/data");
var dataResultItem_1 = require("../model/dataResultItem");
var elasticsearch = require('elasticsearch');
var elastic = (function (_super) {
    __extends(elastic, _super);
    function elastic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    elastic.prototype.configure = function () {
        var _this = this;
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
        });
        this.client.ping({
            requestTimeout: 1000
        }, function (error) {
            if (error)
                console.trace(error);
        });
        this.client.indices.delete({
            index: "*"
        }, function () {
            _this.client.indices.create({
                index: "globals"
            }, function () {
                _this.client.indices.putMapping({
                    index: "globals",
                    type: "keys",
                    body: {
                        properties: {
                            name: {
                                type: "keyword"
                            }
                        }
                    }
                }, function () {
                });
            });
        });
    };
    elastic.prototype.createProject = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var indiceCheck, projectCheck;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.indices.exists({
                            index: name
                        })];
                    case 1:
                        indiceCheck = _a.sent();
                        return [4, this.query("globals/keys", {
                                name: name
                            })];
                    case 2:
                        projectCheck = _a.sent();
                        return [2, new Promise(function (resolve) {
                                if (indiceCheck && projectCheck.data.hits.total > 0) {
                                    resolve(new dataResultItem_1.dataResultItem({
                                        status: false,
                                        message: "app exists"
                                    }));
                                    return;
                                }
                                return _this.clearAndCreate(name, indiceCheck, projectCheck.data.hits.total);
                            })];
                }
            });
        });
    };
    elastic.prototype.clearAndCreate = function (name, indiceCheck, total) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!indiceCheck) return [3, 2];
                        return [4, this.client.indices.delete({ index: name })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(total > 0)) return [3, 4];
                        return [4, this.deleteIndex("globals/keys", { name: name })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2, new Promise(function (resolve) {
                        })];
                }
            });
        });
    };
    elastic.prototype.getItemById = function (route, key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parsed = route.split("/");
                        var result = _this.executeCommand("get", {
                            index: parsed[0],
                            type: parsed[1],
                            id: key
                        });
                        resolve(result);
                    })];
            });
        });
    };
    elastic.prototype.createNewIndex = function (route, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parsed = route.split("/");
                        var result = _this.executeCommand("index", {
                            index: parsed[0],
                            type: parsed[1],
                            body: props
                        });
                        resolve(result);
                    })];
            });
        });
    };
    elastic.prototype.createUniqueIndex = function (route, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parsed = route.split("/");
                        var result = _this.executeCommand("create", {
                            index: parsed[0],
                            type: parsed[1],
                            id: name,
                            body: {
                                name: name
                            }
                        });
                        resolve(result);
                    })];
            });
        });
    };
    elastic.prototype.deleteIndex = function (route, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parsed = route.split("/");
                        var result = _this.executeCommand("delete", {
                            index: parsed[0],
                            type: parsed[1],
                            body: props
                        });
                        resolve(result);
                    })];
            });
        });
    };
    elastic.prototype.query = function (route, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parsed = route.split("/");
                        var result = _this.executeCommand("search", {
                            index: parsed[0],
                            type: parsed[1],
                            body: {
                                "query": {
                                    "constant_score": {
                                        "filter": {
                                            "term": props
                                        }
                                    }
                                }
                            }
                        });
                        resolve(result);
                    })];
            });
        });
    };
    elastic.prototype.executeCommand = function (commandType, cmd) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.client[commandType](cmd, function (err, resp) {
                            var result = new dataResultItem_1.dataResultItem({
                                status: err ? false : true,
                                message: err ? err.message : "",
                                data: err || resp
                            });
                            resolve(result);
                        });
                    })];
            });
        });
    };
    return elastic;
}(data_1.data));
exports.elastic = elastic;
