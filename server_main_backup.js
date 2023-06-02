const express = require('express')
const server = express();
const dotenv= require('dotenv');
const path= require('path');
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const multer= require('multer')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const router= express.Router();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8080

//determines on which port the server will run.
server.listen(PORT,()=>
{
    console.log(`Server is running on http://localhost:${PORT}`);
})
  
//set view engine
server.set("view engine","ejs");
server.set("views",path.join(__dirname,"views"));
//middlewares
server.use(express.static(path.join(path.resolve(),"public")));
//used to access form data
server.use(express.urlencoded({extended:true}));
server.use(express.json());
//var urlencodedParser = bodyparser.urlencoded({extended:true})
//var jsonParser = bodyparser.json();
server.use(cookieParser());
server.use(helmet());

mongoose.connect("mongodb://localhost:27017",{
    dbName:"MERN"
}).then(()=>console.log("Database connected")).catch((e)=>console.log(e))

const mschema = new mongoose.Schema({
    name  : String,
    email : String,
    password: String
})

const message = mongoose.model("Users",mschema)


const authenticated = async (req,res,next)=>
{
    const {token} = req.cookies;
    if(token)
    {
        const decode = jwt.verify(token,"uufdufihgic");
        console.log(decode);
        req.cookies.token=decode;
        req.user= await message.findById(decode._id);
        //next is used to call the next handler.
        next();
    }
    else
    {
        res.render("login");
    }
}
server.get("/",authenticated,(req,res)=>
{
    console.log(req.user)
    res.render("logout",{name:req.user.name})
    console.log(req.cookies);
     //console.log(token);
})
server.post("/register", async(req,res)=>
{
    let {name,email,password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    let user = await message.create(
        {
        name, 
        email,
        password:hashedPassword
        })

        const token = jwt.sign({_id:user._id},"uufdufihgic");
        console.log(token)
        res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now()+60*1000)
    });
    console.log(name,email);
    res.send("User Created")
})

server.post("/login", async (req,res)=>
{
    let {name,email,password}=req.body;
    let user = await message.findOne({email});
    //const pass = user.password;
    //console.log(passcode);
    if(user)
    {
        let passcode= await bcrypt.compare(password,user.password);
        if(passcode)
        {
            const token = jwt.sign({_id:user._id},"uufdufihgic");
            console.log(token)
            res.cookie("token",token,{
            httpOnly:true,
            expires: new Date(Date.now()+60*1000)
        });
            return res.render("Logout",{name:name});
        }
        else
        {
            res.render("login",{message:"Incorrect Password", email:email, name:name});
        }
    }
    else
    {
        return res.render("register")
       //console.log("Register first");
    }
})
 
server.get("/logout",(req,res)=>
{
    res.cookie("token","null",{
        httpOnly:true,
        //expires: new Date(Date.now()+60*1000)
        expires: new Date(Date.now())
    });
    res.redirect("/");
})
