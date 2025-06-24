import jwt from 'jsonwebtoken';
import user from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try{
    const token = req.cookies.jwt;
    if(!token){
       return  res.status(401).json({message: "Unauthorized access, no token provided"});
        
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({message: "Unauthorized access, invalid token"});
    }

    const userFound = await user.findById(decode.userId).select("-password"); //decode karne par payload mila jisme maine userid define kiya tha
    if(!userFound){
        return res.status(401).json({message: "Unauthorized access, user not found"});  
    }
    req.user = userFound; // Attach the user to the request object
//     Attach User + Call Next Middleware
// req.user = userFound: attaches the full user object to the request

// Now, any route handler below can access req.user
    next();

    }catch(error){
        console.log("error in protect route auth miidleware:", error.message);
        return res.status(500).json({message: "Internal server error"});
    }

}