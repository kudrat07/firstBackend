const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{

    }).then(() => {
        console.log("DB connection successful");
    }).catch((err) => {
        console.log("Issue in DB connection");
        console.error("err")
    })
}
module.exports = dbConnect;