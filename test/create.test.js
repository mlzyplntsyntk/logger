"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require('chai');
var mocha = require("mocha");
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect();
var jasmine = require('jasmine-core');
chai.use(chaiHttp);
var server = "http://localhost:1152";
describe("test start", function () {
    it("should insert un existing project", function (done) {
        chai.request(server)
            .post("/project/create")
            .send({
            name: "project-x"
        })
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.status(true);
            done();
        });
    });
    it("should fail to insert existing project", function (done) {
        chai.request(server)
            .post("/project/create")
            .send({
            name: "project-x"
        })
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.status(false);
            done();
        });
    });
});
