const express = require("express")
const app = express()
const cors = require('cors')
const path = require("path")

require("dotenv").config()

const mongoDb = require("./configs/mongodb.connection");

app.use(express.json())
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "storage/uploads")));

const usersRoutes = require("./routes/users.route")
app.use("/users", usersRoutes)

const authRoutes = require("./routes/auth.route")
app.use("/auth", authRoutes)

const postsRoutes = require("./routes/posts.route")
app.use("/posts", postsRoutes)

app.listen(8000, (err) => { 
  if (err) {
    throw err
  }
  mongoDb()
  console.log("server is running on port: ", 8000)
})