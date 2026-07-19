// import dotenv from "dotenv";
// dotenv.config();

process.on("uncaughtException",(error)=>{
    console.log("uncaughtEception",error);
    process.exit(1);
});

import "dotenv/config";
import app from "./app";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
import { verifyMailServerConnection } from "./config/nodemailer.config";
import mongoose from "mongoose";

const PORT = ENV_CONFIG.PORT ;
 const DB_URI = ENV_CONFIG.DB_URI!;


//connect Database




//* connect database
connectDatabase(DB_URI);

//* listens 

const server = app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);

    verifyMailServerConnection();
    //sendEmail();
});

process.on("unhandledRejection",(error)=>{
    console.log("unhandledRejection",error);
    process.exit(1);
});

process.on("SIGINT",()=>{
    console.log("SIGINT");
    server.close(async(error)=>{
        await mongoose.disconnect();
        process.exit(0);
    })
});

