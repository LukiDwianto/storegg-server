var express = require("express");
var router = express.Router();
const { index } = require("./controller");

/* GET home page. */
const { isLoginAdmin } = require("../middleware/auth");
router.use(isLoginAdmin);
router.get("/", index);

module.exports = router;
