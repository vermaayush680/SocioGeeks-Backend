const express = require('express');
const { getUser,getUserFriends,addRemoveFriend } = require('../controllers/user');

const router = express.Router();

router.get('/:id',getUser);
router.get("/:id/friends",getUserFriends);
router.post("/:id/:friendId",addRemoveFriend);

module.exports = router;