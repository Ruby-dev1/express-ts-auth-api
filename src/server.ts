import app from "./app";
import { connectDatabase } from "./config/db.config";

const PORT = 8080;
 const DB_URI ="mongodb+srv://rubina:Bc9AWnXxIEyslHE7@cluster0.wlwmbat.mongodb.net/ecommerce?appName=Cluster0"


//connect Database




//* connect database
connectDatabase(DB_URI);

//* listens 

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});