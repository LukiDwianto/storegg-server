var express = require("express");
var router = express.Router();

const multer = require("multer");
const os = require("os");
const { loginPage, actionSignIn, actionLogout } = require("./controller");

/* GET home page. */
router.get("/", loginPage);
router.post("/", actionSignIn);
router.get("/logout", actionLogout);

module.exports = router;
