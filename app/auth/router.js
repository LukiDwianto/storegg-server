var express = require("express");
var router = express.Router();

const multer = require("multer");
const os = require("os");
const { signUp, signIn } = require("./controller");
const formDataMiddleWare = multer({ dest: os.tmpdir() }).single("image");
/* GET home page. */
router.post("/signup", formDataMiddleWare, signUp);

router.post("/signin", signIn);

module.exports = router;
