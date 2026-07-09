// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
import app from "./app";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";

const PORT = ENV_CONFIG.PORT ;
 const DB_URI = ENV_CONFIG.DB_URI!;


//connect Database




//* connect database
connectDatabase(DB_URI);

//* listens 

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});

