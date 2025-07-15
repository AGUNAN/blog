import User from "../models/user.js"
import bcrypt from "bcrypt"

export  const  signup= async (req, res) =>{
    try {
        const {username,email,password}=req.body
        const existingEmail= await User.findOne({email:email})//check the user already exist in database
        const existingUsername = await User.findOne({username:username})//check username 
        
        //validate email
        if(existingEmail || existingUsername){
            return res.status(400).json({error:"Already Existing user or email"})
        }

         //validate password
        if(password.length <6){
            return res.status(400).json({error:"Password must be atleast 6 characters"})
        }

          //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        //create newuser in database
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
             await newUser.save()
             res.status(200).json(newUser,{message:"User created successfully"})
        }else{
            res.status(400).json({error:"Invalid user Data"})
        }
     
        
    } catch (error) {
        console.log(`Error at signup controller ${error}`)
        res.status(500).json({message:error})
    }
}