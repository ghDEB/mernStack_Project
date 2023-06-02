import mongoose from "mongoose"

const mschema = new mongoose.Schema({
    name  : String,
    email : {
       type: String,
       unique: true,
    },
    password: {
        type: String,
        select: false,
     },
     createDate :{
        type: Date,
        default: Date.now,
     }
})
export const USER = mongoose.model("Users",mschema)