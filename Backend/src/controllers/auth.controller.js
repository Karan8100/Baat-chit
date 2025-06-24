import user from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../config/stream.js"; // Import the function to upsert user in Stream

export async function signup(req,res){
    const { fullName , email , password} = req.body;

   try{
    if(!fullName || !email || !password){
        return res.status(400).json({message: "Please fill all the fields"});
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Please enter a valid email address"});
    }


    const existingUser = await user.findOne({email});
    if(existingUser){
        return res.status(400).json({message :"User already exists"});
    }
     
    
    const seed = encodeURIComponent(user.fullName || user.email);
    const style = "avataaars";
    const userAvatar = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
   
        const newUser = await user.create({
            fullName,
            email,
            password,
            profilePic: userAvatar,

        });

        


        const payload = {
            userId: newUser._id,
        }

         //todo create tthe user in stream

        await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic || "",
            
        });
        console.log("Stream user upserted successfully");

       
        const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRE || '7d'});
        res.cookie('jwt',token,{
            httpOnly: true, //prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        //JWT expiry = "When does this access card expire?"

        //Cookie expiry = "How long should I keep this card in my wallet?"

        res.status(201).json({
            success:true,
            user : newUser,
        })
        
    }catch(error){
      console.log("Error creating user:", error.message);
       return  res.status(500).json({message: "Internal server error"});
    }
}
export async function login(req,res){
    try{
       const {email, password} = req.body;
       if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const userFound = await user.findOne({email});
        if(!userFound){
            return res.status(400).json({message: "invalid email or password"});
        }

        const isMatch = await userFound.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "invalid email or password"});
        }

        const payload = {
            userId : userFound._id,
            
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE || '7d'});
        res.cookie('jwt', token, {
            httpOnly: true, // prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success:true ,
            user: userFound,
        });

    }catch(error){
        console.log("Error logging in user:", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}
export function logout(req,res){
     res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req,res){
    try{
     const userId = req.user._id;
    //ye samjhna hai
    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    ).select("-password"); // Exclude password from the response
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    // Upsert the user in Stream

     try{
        await upsertStreamUser({
        id: updatedUser._id.toString(),
        name:updatedUser.fullName,
        image:updatedUser.profilePic || "",
     });
       console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
     }catch(streamError){
        console.log("Error upserting user in Stream:", streamError.message);
        return res.status(500).json({message: "Internal server error while updating Stream user"});
     }

     res.status(200).json({
        sucess: true,
        user: updatedUser,
     })
    
    }catch(error){
        console.log("Error in onboard function:", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
    
}