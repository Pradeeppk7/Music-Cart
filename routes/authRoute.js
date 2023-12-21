const express = require("express");
const { createUser, loginUser, logout, handleRefreshToken } = require("../controller/userCtrl");
const router = express();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
module.exports = router;