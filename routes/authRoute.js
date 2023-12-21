const express = require("express");
const { createUser, loginUser, logout } = require("../controller/userCtrl");
const router = express();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/logout", logout);
module.exports = router;