const express = require('express');
const upload = require('../config/multer');
const { registerUser, login } = require('../controllers/auth');

const router = express.Router();



router.use('/register',upload.single("picture"),registerUser);
router.use('/login',login);
router.use('*', function (req, res) {
    return res.status(400).json({
        "message": "Invalid Route"
    });
});

module.exports = router;