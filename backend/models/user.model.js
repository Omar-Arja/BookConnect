const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, {
  timestamps: true
})

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  review: String,
  pic_url: String,

  likes: [likeSchema]
}, {
  timestamps: true

})

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  name: String,

  posts: [postSchema],

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true

})

const model = mongoose.model("User", userSchema)
module.exports = model;