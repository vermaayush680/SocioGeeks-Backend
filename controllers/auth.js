const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.js");


/* REGISTER USER */

const registerUser = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log("registerUser requestBody", requestBody);
        const { firstName, lastName, email, password, picturePath, friends, location, occupation, viewedProfile, impressions } = requestBody;

        const salt = await bcrypt.genSalt(); // Create a random SALT (Encryption)
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: passwordHash,
            picturePath: picturePath,
            friends: friends,
            location: location,
            occupation: occupation,
            viewedProfile: viewedProfile || 0,
            impressions: impressions || 0
        });

        const savedUser = await newUser.save();
        savedUser.password = undefined;
        console.log("savedUser Data", savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.message) error = error.message;
        console.log("registerUser Error", error);
        res.status(500).json({ "error": error });
    }
};

const login = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log("registerUser requestBody", requestBody);
        const { email, password } = requestBody;

        let user = await userModel.findOne({ email: email });
        if (!user) throw "User Does Not Exist";

        console.log("user",user);

        const isMatch = await bcrypt.compare(password, user.password); // Compare using the same SALT!!
        if (!isMatch) throw "Incorrect Password";
        user.password=undefined;

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        console.log("user",user);
        res.status(200).send({ token, user });
    } catch (error) {
        if (error.message) error = error.message;
        console.log("registerUser Error", error);
        res.status(500).send({ "error": error });
    }
};

module.exports = {
    registerUser,
    login
};