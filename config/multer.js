const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        console.log("fileName",file.originalname);
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

module.exports = upload;