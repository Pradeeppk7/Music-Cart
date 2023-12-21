const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/dbConnect");
dbConnect();
app.use('/', (req, res) => {
    res.send("Hellow from server");
})
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})