const mongoose = require("mongoose");

schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

var roleSchema = new mongoose.Schema({
  roleId: {
    type: Integer,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  roleName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
    unique: true
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = roleSchema;
