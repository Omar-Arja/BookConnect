const { User } = require("../models/user.model");
const { Post } = require("../models/user.model");

const searchPosts = async (req, res) => {
    const { query } = req.query;
    const currUser = req.user;

    try {
        const regexQuery = new RegExp(query, "i");
        const searchOptions = {
            $or: [
                { "posts.title": { $regex: regexQuery } },
                { "posts.author": { $regex: regexQuery } },
                { "posts.genre": { $regex: regexQuery } },
                { "posts.review": { $regex: regexQuery } },
            ],
        };

        const usersWithMatchingPosts = await User.find(searchOptions);

        if (usersWithMatchingPosts.length > 0) {
            const matchingPosts = [];

            for (const user of usersWithMatchingPosts) {
                for (const post of user.posts) {
                    if (
                        post.title && post.title.match(regexQuery) ||
                        post.author && post.author.match(regexQuery) ||
                        post.genre && post.genre.match(regexQuery) ||
                        post.review && post.review.match(regexQuery)
                    ) {
                        const likedPost = await Post.findById(post._id).populate("likes");

                        let isLiked = false;
                        let likeCount = 0;

                        if (likedPost) {
                            isLiked = likedPost.likes.some(
                                (like) => like.user && like.user._id.toString() === currUser._id.toString()
                            );
                            likeCount = likedPost.likes.length;
                        }

                        const postInfo = {
                            postId: post._id,
                            title: post.title,
                            author: post.author,
                            genre: post.genre,
                            review: post.review,
                            likes: post.likes,
                            pic_url: post.pic_url,
                            isLiked: isLiked,
                            likeCount: likeCount,
                            username: user.name,
                        };

                        matchingPosts.push(postInfo);
                    }
                }
            }

            return res.status(200).json({ message: "success", data: matchingPosts });
        } else {
            return res.json({ message: "No matching posts found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



const searchUsers = async (req, res) => {
    const { user } = req;
    const { query } = req.query;

    try {
        const regexQuery = new RegExp(query, "i");
        const searchOptions = {
            $or: [
                { name: { $regex: regexQuery } },
            ],
        };

        const initialMatchingUsers = await User.find(searchOptions);

        const matchingUsers = initialMatchingUsers.filter(
            (matchedUser) => matchedUser._id.toString() !== user._id.toString()
        );

        if (matchingUsers.length > 0) {
            const modifiedUsers = matchingUsers.map(matchedUser => {
                const userObj = matchedUser.toObject();
                userObj.isFollowing = user.following.includes(matchedUser._id);
                return userObj;
            });

            return res.status(200).json({ message: "success", posts: modifiedUsers });
        } else {
            return res.json({ message: "No matching users found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { searchPosts, searchUsers };
