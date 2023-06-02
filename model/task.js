import mongoose from "mongoose"

const mschema = new mongoose.Schema({
    title  : String,
    email : {
       type: String,
       required: true,
    },
    description : {
        type: String,
        required: true,
     },
    isCompleted: {
        type: Boolean,
        select: false,
     },
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
     }, 
     createDate :{
        type: Date,
        default: Date.now,
     }
})
export const TASK = mongoose.model("Task",mschema)