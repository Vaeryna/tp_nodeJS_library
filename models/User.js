const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
  /* lastname: String,
    firstname: String, */
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

UserSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("User", UserSchema);
