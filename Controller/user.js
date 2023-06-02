import { USER } from '../model/user.js';
import bcrypt from "bcrypt";
import { sendCookie } from '../utils/features.js';
import errorHandler from '../middlewares/error.js';

export const register = async (req,res,next)=>
{
    try 
    {
        const {name,email,password}= req.body;
        let user = await USER.findOne({email});
        if(user)
        {
            return res.status(404).json({
                success:"false",
                message:"User already exist"
            })
        }
        else
        {
            const hashedPassword = await bcrypt.hash(password,10);
            user = await USER.create({
                name,
                email,
                password:hashedPassword
            })
            sendCookie(user,res,"Registered Successfully", 201)
         }
    } 
    catch (error) 
    {
        next(error)
    }
}


export const login = async (req,res,next)=> {

    try 
    {
        const {name,email,password}= req.body;
    let user = await USER.findOne({email}).select("+password");
    if(!user)
    {
        return next(new errorHandler("User Not Found", 404));
    }
    else
    {
        const isMatch =  bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            res.status(404).json({
                success:false,
                message:"Invalid Password"
            })
        }
        else
        {
            sendCookie(user,res,`Welcome Back",${user.name}`,200);
        }
    }
    } catch (error) 
    {
        next(error)
    }
}

export const getMyProfile = (req,res)=>
{
        res
        .status(200)
        .json({
                success:"true",
                user:req.user
            })

    //edit using POSTMAN http://localhost:4000/users/all?keyword=Deb&category=engineer
    //console.log(req.query);
    ///console.log(req.query.category);
}

export const logout = (req,res)=>
{
        res
        .status(200)
        .cookie("token","", {expires: new Date(Date.now())})
        .json({
                success:"true"
            })

    //edit using POSTMAN http://localhost:4000/users/all?keyword=Deb&category=engineer
    //console.log(req.query);
    ///console.log(req.query.category);
}



/*export const getUserById = async (req,res)=>
{
    //edit using POSTMAN http://localhost:4000/userid?id=646914fd04affded89409227
    //const {id} = req.query;
    const {id} = req.params;
    const users = await USER.findById(id);
    res.json({
        success:"true",
        users
    })
    
}
export const deleteUserById = async (req,res)=>
{
    //edit using POSTMAN http://localhost:4000/userid?id=646914fd04affded89409227
    //const {id} = req.query;
    const {id} = req.params;
    const users = await USER.findById(id);
    res.json({
        success:"true",
        message:"Deleted",
        users
    })
    
}
export const updateUserById = async (req,res)=>
{
    //edit using POSTMAN http://localhost:4000/userid?id=646914fd04affded89409227
    //const {id} = req.query;
    const {id} = req.params;
    const users = await USER.findById(id);
    res.json({
        success:"true",
        message:"Updated",
        users
    })
    
}*/
