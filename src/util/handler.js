"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Tuples = (function () {
    function _Tuples() {
    }
    return _Tuples;
}());
var handler = (function () {
    function handler() {
    }
    handler.register = function (t, name) {
        if (typeof this.handlers[name] === "undefined") {
            this.handlers[name] = t;
        }
    };
    handler.getByName = function (name) {
        return this.handlers[name];
    };
    handler.handlers = new _Tuples();
    handler.instances = new _Tuples();
    return handler;
}());
exports.handler = handler;
