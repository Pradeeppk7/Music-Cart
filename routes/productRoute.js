const express = require("express");
const { createProduct, getaProduct, getallProduct } = require("../controller/productCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getaProduct);
router.get("/", getallProduct);

module.exports = router;