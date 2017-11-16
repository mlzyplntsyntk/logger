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
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../util/data");
var elasticsearch = require('elasticsearch');
var elastic = (function (_super) {
    __extends(elastic, _super);
    function elastic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    elastic.prototype.configure = function () {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
        });
        this.client.ping({
            requestTimeout: 1000
        }, function (error) {
            if (error)
                console.trace('elasticsearch cluster is down!');
        });
    };
    return elastic;
}(data_1.data));
exports.elastic = elastic;
