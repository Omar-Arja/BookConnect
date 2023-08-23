// const connection = require("../configs/db.connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {

    if (!email || !password) {
      return res.status(401).send({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Incorrect Email/Password" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).send({ message: "Incorrect Email/Password" });
    }

    const { password: hashedPassword, ...userInfo } = user.toObject();

    const token = jwt.sign(userInfo, process.env.SECRET_KEY);

    return res.send({
      token,
      user: userInfo
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }

};

module.exports = { login };