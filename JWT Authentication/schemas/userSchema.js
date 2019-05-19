const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:8,
        max:28
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:8,
        max:28
    },
    phone:{
        type:String,
        min:11,
        max:11,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:14,
        max:64,
    },
    joined:{
        type:String,
        default:Date.now(),
    },
    pharmaName:{
        type:String,
        required:true
    },
    auth:{
        type:Number,
        default:0
    }
})

module.exports = userSchema;