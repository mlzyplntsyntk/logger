import {} from 'jasmine';

let chai = require('chai');
let mocha = require("mocha");

let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
let jasmine = require('jasmine-core');
//let server = require("../src/index");

chai.use(chaiHttp);
var server = "http://localhost:1152";



describe("test start", ()=>{
    //hello world
    it("should insert un existing project", (done)=>{
        chai.request(server)
           .post("/project/create")
           .send({
               name : "project-x"
           })
           .end((err,res)=>{
               res.should.have.status(200);
               res.body.should.have.status(true);
               done();
           });
    });
    
    it("should fail to insert existing project", (done)=>{
        chai.request(server)
            .post("/project/create")
            .send({
                name : "project-x"
            })
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.status(false);
                done();
            });
     });
    
/*
    after(function() {
        requester.close();
    });*/
    
});