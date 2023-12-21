const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json(findUser);
    }
    else
    {
        throw new Error("Invalid Credentials");
        }
});
module.exports = { createUser, loginUser };