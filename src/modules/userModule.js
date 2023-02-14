const mongoose = require('mongoose'); 
const validator= require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

var userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true, " Please Enter Your Full Name"],
        trim: true
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"]
    
    },
    mobile:{
        type:String,
        required:[true, "Please Enter Your Mobile Number"]
    },
    password:{
        type:String,
        required:[true, "Please Enter Your Password"],
        minLength: [8, "Min Length of Psaaword is 8."],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
    },
    role:{
        type: String,
        default: "User"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{timestamps:true});

//!hashing password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
});

//! JWT Token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

//! Reset Password
// userSchema.methods.getResetPasswordToken = function(){
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     //hashing and  adding user schema to userSchema
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken
// }



module.exports = mongoose.model('User', userSchema);