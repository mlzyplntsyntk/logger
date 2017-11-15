"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model = (function () {
    function model() {
    }
    model.createFromObject = function (obj) {
        for (var a in obj) {
            this[a] = obj[a];
        }
        return this;
    };
    return model;
}());
exports.model = model;
