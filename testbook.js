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
dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8080

//determines on which port the server will run.
server.listen(PORT,()=>
{
    console.log(`Server is running on http://localhost:${PORT}`);
})

//shows provided path information - dirname/basename/extname
// always put \\ for backslash, and / for foward slash. Pre-defined rule.
const a1=path.dirname('C:\\Users\\debmghos\\Documents\\MERN\\mern\\views\\index.ejs')
console.log('1')
console.log(a1);

console.log(path.parse('C:\\Users\\debmghos\\Documents\\MERN\\mern\\views\\index.ejs'))
console.log('2')

// __filename shows current file information
const a2=path.dirname(__dirname);
console.log(a2);

//give free memory space about internal memory and return in bytes
console.log(os.freemem())

//give total memory space about internal memory and return in bytes
console.log(os.totalmem())

//gives information about system if 64 bit or 32 bit
console.log(os.arch())

//gives windows version information
console.log(os.release())

//gives information about platform.
console.log(os.platform())

//gives information,in seconds,about how much time the system has not been shut down.
console.log(os.uptime())

//gives cpu related information
console.log(os.cpus())

//gives time to load the activity
console.log(os.loadavg())

//give OS bit processor system
//console.log(os.machine())
console.log(os.networkInterfaces())
//console.log(os.constants());
//console.log(os.endianness())

//log requests
//app.use(morgan('tiny'));

//synchronous - so callback functions wont't work. utf-8 is used to mitigate buffering
console.log(fs.readFileSync("file1.txt", "utf-8"))

//asynchronous
fs.readFile("file1.txt","utf-8",(err,data)=>
{
    console.log(typeof(data));
    console.log(data);
    //console.log(JSON.parse(data));
    console.log(err);
})

//read multiple files
/*fs.readFile("file1.txt","utf-8",(err,data)=>
{
    console.log(typeof(data));
    console.log(data);
    //console.log(JSON.parse(data));
    console.log(err);
})*/

//write files asynchronously
fs.writeFile("file1.txt","Write file example",(err,data)=>
{
    console.log(data);
})

//write files synchronously
console.log(fs.writeFileSync("file1.txt","owiefhdqwhs"))

//Create a new file using the appendFile() method:
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

//Create a new, empty file using the open() method:
fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

//Create a new file using the writeFile() method:
fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  //delete file
  /*fs.unlink("file1.txt",()=>
  {
    console.log("File Deleted")
  })*/


  //File Renaming
  /*fs.rename('world.txt', 'Renamedfile.txt', ()=>
  {
    console.log("File Renamed")
  })*/