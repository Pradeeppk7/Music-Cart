const express = require("express");
const createUser = require("../controller/userCtrl");
const router = express();

router.post("/register",createUser);
router.post("/login",);

module.exports = router;