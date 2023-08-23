const { User, Post, Like } = require("../models/user.model");

const getFeed = async (req, res) => {
  const { user } = req;

  try {
    const { following } = await User.findById(user._id).populate("following").populate("posts");

    const feed = [];

    following.forEach((followedUser) => {
      followedUser.posts.forEach((post) => {
        post.username = followedUser.name;
        post.isLiked = post.likes.some(
          (like) => like.user.toString() === user._id.toString()
        );
        post.likeCount = post.likes.length;
        feed.push(post);
      });
    });

    feed.sort((a, b) => b.createdAt - a.createdAt);
    res.send(feed);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
};

const createPost = async (req, res) => {
  const { user } = req;
  const { title, author, genre, review } = req.body;
  const imagePath = req.file.path;
  const pic_url = `../backend/storage/${imagePath.split("\\").slice(-2).join("/")}`;

  try {
    const post = new Post({
      title,
      author,
      genre,
      review,
      pic_url,
      likes: [],
    });

    await post.save();

    user.posts.push(post._id);

    await user.save();
    res.send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    console.log(user);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const toggleLikePost = async (req, res) => {

};

module.exports = {
  getFeed,
  createPost,
  toggleLikePost,
};
