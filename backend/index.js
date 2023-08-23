const express = require("express")
const app = express();
const cors = require('cors');

require("dotenv").config()

const mongoDb = require("./configs/mongodb.connection");

app.use(express.json())
app.use(cors());
const usersRoutes = require("./routes/users.route")
app.use("/users", usersRoutes)

const authRoutes = require("./routes/auth.route")
app.use("/auth", authRoutes)

app.listen(8000, (err) => { 
  if (err) {
    throw err
  }
  mongoDb()
  console.log("server is running on port: ", 8000)
})