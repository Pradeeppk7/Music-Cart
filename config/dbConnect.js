const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    try {
        mongoose
            .connect(process.env.DB_CONNECT_URL)
        console.log('MongoDB Connected');
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = dbConnect;
