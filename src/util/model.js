"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model = (function () {
    function model() {
    }
    model.createFromObject = function (t, obj) {
        console.log(obj);
        for (var a in obj) {
            if (t[a])
                t[a] = obj[a];
        }
        return t;
    };
    return model;
}());
exports.model = model;
