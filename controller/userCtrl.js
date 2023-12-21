const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");

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

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check user exists
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
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
module.exports = { createUser, loginUser, logout };