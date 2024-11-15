// require('dotenv').config({path:'./.env'});
import dotenv from "dotenv";
dotenv.config({path:'./.env'})
import {app} from "./app.js"


import connectDb from "./db/index.js";

connectDb()
.then(
    ()=>{
        const port = process.env.PORT || 8000;
        app.listen(port,()=>{
            console.log(`Server is live at port : ${port}`);
        })
    }
)
.catch((error)=>{
    console.log(`connection failed ${error}`);
})

