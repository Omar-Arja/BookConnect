const { User, Post, Like } = require("../models/user.model");

const getFeed = async (req, res) => {
  const { user } = req;

  try {
    const { following } = await User.findById(user._id).populate("following").populate({ path: "posts", populate: { path: "likes" } });

    const feed = [];

    for (const followedUser of following) {
      for (const followedPost of followedUser.posts) {
        const post = followedPost.toObject();
        post.userId = followedUser._id;
        post.username = followedUser.name;

        const likedPost = await Post.findById(post._id).populate("likes");

        if (likedPost) {
          post.isLiked = likedPost.likes.some(
            (like) => like.user && like.user._id.toString() === user._id.toString()
          );
          post.likeCount = likedPost.likes.length;

          feed.push(post);
        }
      }
    }

    feed.sort((a, b) => b.createdAt - a.createdAt);
    res.send(feed);
  } catch (error) {
    console.error("Error getting feed:", error);
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
    });

    await post.save();

    user.posts.push(post);

    await user.save();
    res.send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    console.log(user);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const toggleLikePost = async (req, res) => {
  const { user } = req;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("likes");
    
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const isLiked = post.likes.some(
      (like) => like.user && like.user._id.toString() === user._id.toString()
    );

    if (!isLiked) {
      const newLike = new Like({ user: user._id });
      await newLike.save();

      post.likes.push(newLike);
      await post.save();

      return res.send({ message: "Post liked" });
    }

    const likeToRemove = post.likes.find(
      (like) => like.user && like.user._id.toString() === user._id.toString()
    );

    if (likeToRemove) {
      await Like.findByIdAndDelete(likeToRemove._id);
      post.likes.pull(likeToRemove._id);
      await post.save();
      return res.send({ message: "Post unliked" });
    }

    return res.status(404).send({ message: "Like not found" });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};


module.exports = {
  getFeed,
  createPost,
  toggleLikePost,
};
