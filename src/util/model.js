"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model = (function () {
    function model(props) {
        for (var k in props) {
            this[k] = props[k];
        }
    }
    return model;
}());
exports.model = model;
