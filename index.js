const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const jwt = require('jsonwebtoken');


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const PORT = process.env.PORT || 5001;


/* MONGOOSE CONNECTION */
const uri = "mongodb+srv://vermaayush680:ayushver01@cluster0.vc5dbbf.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(
        () => {
            console.log("Server connected");
        },
        (err) => {
            console.log("Not Connected!");
        });
app.listen(PORT, ()=> console.log("Server Running on PORT",PORT));



/* ROUTES WITH FILES */
app.use("/auth",require('./routes/auth'));
app.use("/user",require('./routes/user'));
app.use('/posts',require('./routes/posts'))
// app.post("/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token

//     let jwtSecretKey = process.env.JWT_SECRET;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.send(token);
// });