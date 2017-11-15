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
var handler_1 = require("../util/handler");
var log = (function (_super) {
    __extends(log, _super);
    function log() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hits = 0;
        return _this;
    }
    log.prototype.respond = function (req) {
        return {
            hi: this.hits++
        };
    };
    return log;
}(handler_1.handler));
exports.log = log;
