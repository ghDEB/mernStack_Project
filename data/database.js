import mongoose from "mongoose";

export const connectToDb = ()=>
{
    mongoose.connect(process.env.mongo_uri,{
    dbName:"MERNstack"
}).then(()=>console.log("Database connected")).catch((e)=>console.log(e))
}