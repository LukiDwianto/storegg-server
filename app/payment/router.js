var express = require("express");
var router = express.Router();

const multer = require("multer");
const os = require("os");
const {
  index,
  create,
  actionCreate,
  edit,
  update,
  deleteAction,
  updateStatus,
} = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");
router.use(isLoginAdmin);

/* GET home page. */
router.get("/", index);

router.get("/create", create);
router.post("/create", actionCreate);

router.get("/edit/:id", edit);
router.put("/edit/:id", update);
router.delete("/delete/:id", deleteAction);
router.put("/update-status/:id", updateStatus);

module.exports = router;
