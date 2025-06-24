import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js'; // Assuming you have user routes in user.route.js
import chatRoutes from './routes/chat.route.js'; // Assuming you have chat routes in chat.route.js
import {connectDB} from './config/db.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path';



dotenv.config();





const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

// app.get('/',(req,res)=>{
//     res.send("Hello World");
// })

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use('/api/auth',authRoutes);//“For any incoming request that starts with /api/auth, use the routes defined inside the authRoutes file.”
app.use('/api/users',userRoutes); // Assuming you have user routes in authRoutes, otherwise create a separate user route file
app.use('/api/chat',chatRoutes)

//for production
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  //“If a request doesn't match any API route (like /api/messages), send back index.html.”
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})