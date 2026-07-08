import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDatabase } from "./config/db.config";

const PORT = process.env.PORT || 8080;
 const DB_URI = process.env.DB_URI!;


//connect Database




//* connect database
connectDatabase(DB_URI);

//* listens 

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});

