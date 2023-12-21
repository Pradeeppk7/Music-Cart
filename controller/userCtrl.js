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

module.exports = createUser;