import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    fullName :{
        type: String,
        required: true,
    },
    email :{
        type:String,
        required: true,
        unique: true,
    },
    password :{
        type: String,
        required: true,
        minlength: 6,
    },
    bio :{
        type: String,
        default: "Hey there! I am using this app.",
        maxlength: 100,
        
    },
    profilePic :{
        type: String,
        default:""
    },

    nativeLanguage: {
      type: String,
      default: "",
    },

    learningLanguage: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", //same as model name
        }
    ]



},{timestamps: true});




//use pre hook to hash password before saving
userSchema.pre('save',async function(next){
     // Only hash the password if it's new or modified
        if(!this.isModified('password')){
            return next();
        }
   try{
        const Salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, Salt);
        next();
   }catch(error){
        console.error("Error hashing password:", error.message);
        next(error);
    }
})

//password verification method
userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
};
//pre save hook must be use before the model is created
const User = mongoose.model("User", userSchema);
export default User;