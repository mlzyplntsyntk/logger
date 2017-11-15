import {} from 'jasmine';

let chai = require('chai');
let mocha = require('mocha');

let chaiHttp = require('chai-http');
let server = require('../src/index');
let should = chai.should();
let expect = chai.expect();

chai.use(chaiHttp);

describe("test case", ()=>{
    it("", async(done)=>{
       chai.request(server)
           .get("/log")
           .end((err,res)=>{
               res.should.have.status(200);
               res.headers["content-type"].should.be.eql("application/json; charset=utf-8");
               res.should.have.status(200);
               done();
           });
    });
});