const debug = require("debug")("evolvus-role.test.index.test");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const role = require("./../db/role");
const describe = require("describe");
var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/TestRole";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/role.js
describe('db Role testing', () => {
  let testRole = {
    "roleId" : 1,
    "roleName" : "system",
    "description" : "xxx"
  };
  let testRole1 = {
    "roleId" : 2,
    "roleName" : "system2",
    "description" : "xxx2"
  };
  let testRole2 = {
    "roleId" : 3,
    "roleName" : "system3",
    "description" : "xxx3"
  };

  // Before doing any tests, first get the connection.

  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  describe('testing role.saveRole', () => {
    // Testing save
    // 1. Valid role object should be saved.
    // 2. invalid role object should not be saved.
    beforeEach((done) => {
      role.deleteAll()
        .then(() => {
          role.saveRole(testRole).then(() => {
            done();
          });
        });
    });

    it('should save a role object to database', (done) => {
      let res = role.saveRole(testRole);
      expect(res)
        .to.eventually.have.property('roleId')
        .to.equal(testRole.roleId)
        .notify(done);
    });

    it('should save a role object to database', (done) => {
      let testRole = {
        "roleId" : 4,
        "roleName" : "system4",
        "description" : "xxx4"
      };
      let res = role.saveRole(testRole);
      expect(res)
        .to.eventually.rejectedWith('Role validation failed')
        .notify(done);
    });

  });

  describe('testing role.findAll when data present', () => {
    // 1. Delete all records in the table and Insert two new records.
    // 2. Find -should return an array of size 2 with the  two role objects.

    beforeEach((done) => {
      role.deleteAll()
        .then((res) => {
          role.saveRole(testRole)
            .then((res) => {
              role.saveRole(testRole1)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it('should return 2 role objects', (done) => {
      let res = role.findAll();
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(2);
          expect(docs[0].name)
            .to.equal(testRole.roleId);
          done();
        });
    });
  });

  describe('testing role.findAll when there is no data in database', () => {
    // 1.Delete all the records from database
    // 2.Query the database , should return empty array
    beforeEach((done) => {
      role.deleteAll()
        .then(() => {
          done();
        });
    });

    it('should return empty array', (done) => {
      let res = role.findAll();
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(0);
          expect(docs)
            .to.eql([]);
          done();
        });
    });
  });
});
