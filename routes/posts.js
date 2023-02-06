const express = require('express');
const { verifyToken } = require('../middleware/auth');
const upload = require('../config/multer');
const { createPost, getFeedPosts, getUserPosts, likePost } = require('../controllers/posts');
const router = express.Router();

router.use(verifyToken);
router.get('/',upload.single("picture"),getFeedPosts);
router.post('/createPost',upload.single("picture"),createPost);
router.get('/:userId/posts',upload.single("picture"),getUserPosts);
router.post('/:id/like',upload.single("picture"),likePost);
// router.post('/:id/comment',upload.single("picture"),commentPost);

module.exports = router;