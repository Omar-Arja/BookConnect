const bcrypt = require("bcrypt")
const {User} = require("../models/user.model")

const register = async (req, res) => {
  const { email, password, name } = req.body

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name
  })

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('An error occurred while creating the user: ' + error.message);
  }

}

module.exports = {
  register,
}