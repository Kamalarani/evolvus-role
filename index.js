const debug = require("debug")("evolvus-role.test.db.index.test");
const roleSchema = require("./model/roleSchema")
  .schema;
const role = require("./db/role");

module.exports.save = (roleObject) => {
  return new Promise((resolve, reject) => {
    try {
      role.saveRole(docketObject).then((result) => {
        resolve(result);
      }).catch((e) => {
        reject(e);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    try {
      role.findAll().then((docs) => {
        resolve(docs);
      }).catch((e) => {
        reject(e);
      });
    } catch (e) {
      reject(e);
    }
  });
};
