import { USER } from "../model/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req,res,next)=>
{
    const {token} = req.cookies;
    if(!token)
    {
        res.status(404).json({
            success:false,
            message:"Login First"
        })
    }
        const decodedData =  jwt.verify(token, process.env.jwt_secret);
        req.user = await USER.findById(decodedData._id);
        next();
}