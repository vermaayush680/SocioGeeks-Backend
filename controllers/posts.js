const postModel = require('../models/post');
const userModel = require('../models/user');
const moment = require('moment');

const { users, posts } = require('../data/index');

userModel.insertMany(users);
postModel.insertMany(posts);
console.log("Done");


const createPost = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log("createPost requestBody", requestBody);

        const { userId, description, picturePath } = req.body;
        const userDetails = await userModel.findById(userId);

        const newPost = newPost({
            userId,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            description,
            userPicturePath: userDetails.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();

        const allPosts = await postModel.find();

        return res.status(200).json(allPosts);

    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};

const getFeedPosts = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("getFeedPosts requestParams", requestParams);

        const allPosts = await postModel.find();
        return res.status(200).json(allPosts);

    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};
const getUserPosts = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("getUserPosts requestParams", requestParams);
        const { userId } = requestParams;

        const allUserPosts = await postModel.find({ userId });
        return res.status(200).json(allUserPosts);

    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};

const likePost = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("getUserPosts requestParams", requestParams);
        const requestBody = req.body;
        console.log("getUserPosts requestBody", requestBody);
        const { id } = requestParams;
        const { userId } = requestBody;

        const postToLike = await postModel.findById(id);
        const isLikedbyUser = postToLike.likes.get(userId);

        if (isLikedbyUser) {
            postToLike.likes.delete(userId);
        } else {
            postToLike.likes.set(userId, true);
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            { likes: postToLike.likes },
            { new: true }
        );

        return res.status(200).json(updatedPost);

    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};

// const commentPost = async (req, res) => {
//     try {
//         const requestParams = req.params;
//         console.log("commentPost requestParams", requestParams);
//         const { id } = requestParams;

//         const requestBody = req.body;
//         console.log("commentPost requestBody", requestBody);
//         const { comment } = requestBody;

//         const postToComment = await postModel.findById(id);
//         if(!postToComment) throw "No Post to comment on";

//         const userDetails = await userModel.findById( postToComment.userId );
//         if(!userDetails) throw "No User Profile found";

//         let comments = await  commentModel.findOne({ postId: id });
//         if (!comments) {
//             console.log("First Comment on Post");
//             comments = new commentModel();
//             comments.postId = id;
//         }
//         comments.comment.push({
//             firstName: userDetails.firstName,
//             lastName: userDetails.lastName,
//             comment: comment,
//             time: moment().format("YYYY-MM-DD HH:mm:ss")
//         });
//         console.log("comments",comments);
//         const savedComment = await comments.save();
//         console.log("Comment Saved");

//         return res.status(200).json(comments);

//     } catch (error) {
//         if (error.message) error = error.message;
//         return res.status(500).json({ "error": error });
//     }
// };
module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
}