const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    salary:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required: true,
    }
})
module.exports = mongoose.model("Job", Schema)