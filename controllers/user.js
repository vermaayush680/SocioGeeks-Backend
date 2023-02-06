const userModel = require("../models/user.js");


const getUser = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("getUser requestParams", requestParams);

        const { id } = requestParams;
        if (!id) throw "Incorrect UserId";

        console.log("id", id);

        const userDetails = await userModel.findById({ _id: id });
        if (!userDetails) throw "No User data found";
        userDetails.password = undefined;

        return res.status(200).json(userDetails);
    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};

const getUserFriends = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("getUserFriends requestParams", requestParams);

        const { id } = requestParams;
        if (!id) throw "Incorrect UserId";

        const userDetails = await userModel.findById(id);
        // console.log("Here")
        if (!userDetails || !userDetails.friends || userDetails.friends.length == 0) throw "No User data found";

        // console.log("UserDetails", userDetails);
        userDetails.password = undefined;

        const friends = await Promise.all(
            userDetails.friends.map((id) => userModel.findById(id))
        );

        // console.log("friends",friends);
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        return res.status(200).json(formattedFriends);

    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};

const addRemoveFriend = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("addRemoveFriend requestParams", requestParams);

        const { id, friendId } = requestParams;
        const userDetails = await userModel.findById(id);
        if(!userDetails) throw "Incorrect User Id";
        // console.log(userDetails);
        const friendDetails = await userModel.findById(friendId);
        if(!friendDetails) throw "Incorrect Friend Id";
        // console.log(friendDetails);

        if(userDetails.friends.includes(friendId)){
            console.log("If");
            userDetails.friends = userDetails.friends.filter((id) => id!==friendId);
            friendDetails.friends = friendDetails.friends.filter((id) => id!==id);
        } else {
            console.log("Else");
            userDetails.friends.push(friendId);
            friendDetails.friends.push(id);
        }

        console.log("userDetails",userDetails.friends,"friendDetails",friendDetails.friends);

        const friends = await Promise.all(
            userDetails.friends.map((id) => userModel.findById(id))
        );
        console.log('friends',friends);
        await userDetails.save();
        await friendDetails.save();

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        return res.status(200).json(formattedFriends);

    } catch (error) {
        if (error.message) error = error.message;
        return res.status(500).json({ "error": error });
    }
};

module.exports = {
    getUser,
    getUserFriends,
    addRemoveFriend
}