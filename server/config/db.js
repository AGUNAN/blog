import mongoose from "mongoose"

function  connectDB() {   mongoose.connect("mongodb://localhost:27017/blog").then(()=>{
    console.log("Db connected")
}).catch((err)=>{
    res.status(500).json(err)
})}

export default connectDB

