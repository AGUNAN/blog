import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import user from "./routes/user.js"
import connectDB from "./config/db.js"

const app = express();
dotenv.config();

const PORT= process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth",user)

app.listen(PORT, (req,res)=>{
    connectDB();
    console.log(`server is running at http://localhost:${PORT}`)
})