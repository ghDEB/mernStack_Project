const express = require('express')
const server = express();
const dotenv= require('dotenv');
//const morgan = require('morgan');
const bodyparser = require('body-parser');
const path= require('path');
const os=require('os');
const fs=require('fs');
const mongoose = require("mongoose")
const http = require('http');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

//creating server without express. 
/*const server = http.createServer((req,res)=>
{
   if(req.url==="/about")
    {
        //res.end is used to prevebt unlimjited load. `` is used to convert to template string
        res.end(`<h1>This is about page ${myname}</h1>`);
    }
    if(req.url==="/contact")
    {
        res.end("<h1>This is Contact page</h1>");
    }
    else
    {
        res.end("<h1>Page Not Found</h1>");
    }

    console.log("server is working fine as")
})*/
//encrypts the port number

//middleware can't be used in this way. So need to use .use() 
//By default, the flow will now go to public
//using middlewares

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
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use(cookieParser());
server.use(helmet());

mongoose.connect("mongodb://localhost:27017",{
    dbName:"MERN"
}).then(()=>console.log("Database connected")).catch((e)=>console.log(e))

const mschema = new mongoose.Schema({
    name  : String,
    email : String
})

const message = mongoose.model("Messages",mschema)


/*server.get("/add",async (req,res)=>
{
    await message.create({name:"Debmalya", email:"ghdebmalya24@gmail.com"})
    res.send("Data stored in Db")
    
})*/

//const router = new express.Router();
server.post("/contact", async(req,res)=>
{
    //const userdata= { name: req.body.name, email: req.body.email };
    //users.push({username:"Hi", email:"ghdebmalya24@gmail.com"})
    console.log(req.body);
    //destructuring
    const {username,useremail}=req.body;
    //const username = new message(req.body)
    //await username.save();
    await message.create({username,useremail})
    res.redirect("/success");
})

server.get("/success",(req,res)=>
{
    res.render("success")

})

/*server.post("/demo",(req,res)=>
{
    res.send(req.body)
})*/
server.get("/",(req,res)=>
{
    //The res.render() function is used to render a view and sends the rendered HTML string to the client. 
    //res.sendFile("index");
    //res.render("index",{name:"User Information"});
    res.render("login");
    //status code is used to send the corresponding status.
    //res.sendStatus(404)

    //sends customized status message.
    //res.status(400).send("Nahi hoga ab merese");

    //sends json data.
    /*res.json({
        "name":"Debmalya",
        "age":"25"
    })*/

    //const file= fs.readFileSync("./index.html")

    //path.resolve() gives the directory name
    //const file = path.resolve();
    //res.sendFile(path.join(file,"./index.html"));
})

server.post("/login",(req,res)=>
{
    res.cookie("username","Deb");
    return res.redirect("success");
})
/*server.get("/users",(req,res)=>
{
    res.json({
        users,
    });

})*/
//const router = new express.Router();
server.post("/contact", async(req,res)=>
{
    console.log(req.body);
    //destructuring
    let {username,useremail}=req.body;
    res.cookie(req.body.username,req.body.useremail);
    await message.create({username,useremail});
    res.redirect("/success");
})

server.get("/success",(req,res)=>
{
    res.render("success")

})

