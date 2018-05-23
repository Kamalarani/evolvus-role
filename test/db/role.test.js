const debug = require("debug")("evolvus-role.db.role");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const user = require("../../db/role");
const describe = require("describe");
const roleSchema = require("../../db/roleSchema");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/TestRole";

chai.use(chaiAsPromised);

//var Role = mongoose.model("Role", roleSchema);
// High level wrapper
// Testing db/user.js

  describe("Role testing", () => {

  /*
   ** Before doing any tests, first get the connection.
   */
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  describe("testing role.saveRole", () => {
    // Testing save
    // 1. Valid role should be saved.
    // 2. Non role object should not be saved.
    // 3. Should not save same role twice.
    beforeEach((done) => {
      role.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid role to database", (done) => {
      let testRole = {
        "roleId": 1,
        "roleName": "System",
        "description": "xxx"
      };
      let res = role.saveRole(testRole);
      expect(res)
        .to.eventually.include(testRole)
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {

      let testObject = {
        "sample": "Role"
      };
      let res = role.saveRole(testObject);
      expect(res)
        .to.be.eventually.rejectedWith("Role validation failed")
        .notify(done);
    });
  });

  describe("testing role.find with data", () => {
    // 1. Delete all records in the table and insert
    //    two new records.
    // find -should return an array of size 2 with the
    // two users.
    // Caveat - the order of the users fetched is indeterminate

    let testRole1 = {
      "roleId": 2,
      "roleName": "Role2",
      "description": "xxxyyy"
    };
    let testRole2 = {
      "roleId": 3,
      "roleName": "Role3",
      "description": "xxxyyyzzz"
    };

    // delete all records and insert two users
    beforeEach((done) => {
      role.deleteAll()
        .then((res) => {
          role.saveRole(testRole1)
            .then((res) => {
              role.saveRole(testRole2)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it("should return 2 roles ", (done) => {
      let res = role.findAll();
      expect(res)
        .to.be.fulfilled.then((roles) => {
          expect(roles)
            .to.be.a('array');
          expect(roles.length)
            .to.equal(2);
          expect(roles[0])
            .to.include(testRole);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing role.findAll without data", () => {
    // delete all records
    // find should return empty array
    beforeEach((done) => {
      role.deleteAll()
        .then((res) => {
          done();
        });
    });

    it("should return empty array i.e. []", (done) => {
      let res = role.findAll();
      expect(res)
        .to.be.fulfilled.then((roles) => {
          expect(roles)
            .to.be.a('array');
          expect(roles.length)
            .to.equal(0);
          expect(roles)
            .to.eql([]);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });
});
