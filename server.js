import {app} from "./app.js"
import {connectToDb} from "./data/database.js";

connectToDb();

app.listen(process.env.PORT,()=>
{
console.log(`Server is wroking on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

/*
git init
git add .
git commit -m "initial commit"
git status
*/