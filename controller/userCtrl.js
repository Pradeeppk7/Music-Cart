const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const createUser = expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error("User Already Exists");
        // res.json({
        //     msg: "user already exists",
        //     success: false,
        // });
    }
});

const handleRefreshToken = expressAsyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new Error("No Refresh token present in db or  not matched");
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check user exists
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser.id,
            {
            refreshToken: refreshToken,
            }, { new: true });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            name: findUser?.name,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
            

        });
    }
    else
    {
        throw new Error("Invalid Credentials");
        }
});

const logout=expressAsyncHandler()
module.exports = { createUser, loginUser, logout ,handleRefreshToken };