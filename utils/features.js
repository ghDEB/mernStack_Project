import jwt from "jsonwebtoken"

export const sendCookie = (user, res, message, statusCode)=>
{
    const token = jwt.sign({_id:user._id}, process.env.jwt_secret);
           res
           .status(statusCode)
           .cookie("token",token,{
            httpOnly: true,
            maxAge:15*60*60,
            /*To safeguard more websites and their users, the new secure-by-default model assumes 
            all cookies should be protected from external access unless otherwise specified. 
            Developers must use a new cookie setting, SameSite=None, to designate cookies for cross-site
            access. When the SameSite=None attribute is present, an additional Secure attribute must 
            be used so cross-site cookies can only be accessed over HTTPS connections. 
            This won't mitigate all risks associated with cross-site access but it will provide 
            protection against network attacks.*/
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
           })
           .json({
            success:"true",
            message
           })
}