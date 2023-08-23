const mongoose = require("mongoose")

const mongoDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/book_connect")
    .then(() => {
      console.log("Connected to book connect")
    })
    .catch(err => {
      console.log(err) 
    })
}

module.exports = mongoDb