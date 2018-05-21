const debug = require("debug")("evolvus-role:db:role");
const mongoose = require("mongoose");
const ObjectId = require('mongodb')
  .ObjectID;

const roleSchema = require("./roleSchema");

// Creates a Role collection in the database
var Role = mongoose.model("Role", roleSchema);

// Saves the role object to the database and returns a Promise
module.exports.saveRole = (object) => {
  return new Promise((resolve, reject) => {
    try {
      // any exception during construction will go to catch
      let role = new Role(object);

      // on resolve we need to resolve the this method
      // on reject or exception we reject it,
      // this is because the record either saves or it doesnt
      // in any case it does not save, is a reject
      role.saveRole()
        .then((data) => {
          debug("saved successfully", data._id);
          resolve(data);
        }, (err) => {
          debug(`rejected save.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on save: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }

  });
};

// Returns all the roles with a Promise
// if the collection has not records it Returns
// a promise with a result of  empty object i.e. {}

module.exports.findAll = () => {
  return Role.find({});
};

module.exports.deleteAll = () => {
  return Role.remove({});
};
