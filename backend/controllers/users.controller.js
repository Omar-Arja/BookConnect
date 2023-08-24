const bcrypt = require("bcrypt")
const { User } = require("../models/user.model")

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
    res.send({
      status: "success",
      message: "User created",
      user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('An error occurred while creating the user: ' + error.message);
  }

}

const toggleFollowUser = async (req, res) => {
  const { user } = req;
  const { userId } = req.params;

  try {
    const userToToggle = await User.findById(userId);

    if (!userToToggle) {
      return res.status(404).send({ message: "User not found" });
    }

    const isFollowing = user.following.includes(userId);

    if (!isFollowing) {
      user.following.push(userId);
      await user.save();
      return res.send({ message: "User followed" });
    } else {
      user.following.pull(userId);
      await user.save();
      return res.send({ message: "User unfollowed" });
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};


module.exports = {
  register,
  toggleFollowUser
}