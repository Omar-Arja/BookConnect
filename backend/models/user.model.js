const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: String,
  name: String
})

const model = mongoose.model("User", userSchema)
module.exports = model;