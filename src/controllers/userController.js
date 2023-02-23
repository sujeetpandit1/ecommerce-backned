const ErrorHandler = require('../errorsHandlers/errorHandler');
const userModel = require('../modules/userModule')
const tryCatchError = require('../middleware/tryCatchError');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwtToken');



exports.registerUser = tryCatchError(async (req, res, next) => {
    const {fullName, email, password, mobile, role} = req.body

    if(!(/^\s*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}\s*$/.test(password.trim()))) return res.status(400).send({status:false, message: "Pasword Should be in Alphanumeric and special character and length 8-15 digit only"});
    if (!/^[6789]\d{9}$/.test(mobile)) return res.status(400).send({status: false,msg: `${mobile} is not a valid mobile number, Please enter 10 digit phone number`});
    if (!(/^\s*[a-zA-Z][a-zA-Z0-9]*([-\.\_\+][a-zA-Z0-9]+)*\@[a-zA-Z]+(\.[a-zAZ]{2,5})+\s*$/.test(email))) return res.status(400).send({status: false,message: `${email} should be a valid email address`});

    const checkEmail= await userModel.findOne({email:email})
    if(checkEmail) return res.status(400).send({status:false, message: `this ${email } is already registered, please enter new one or RESET Password`});
    const checkMobile= await userModel.findOne({mobile:mobile})
    if(checkMobile) return res.status(400).send({status:false, message: `this ${mobile} is already registered`});
    const user = await userModel.create({fullName, email, password, mobile,role,avatar:{public_id: "this is sample",url: "this is sample url"}});
    // const token = user.getJwtToken();
    // res.status(201).json({success: true, user, token})
    sendToken(user, 201, res)
});

exports.loginUser = tryCatchError(async(req, res, next) =>{

    const {email, password} = req.body
    if(!email || !password) return next(new ErrorHandler("Please Enter Email and Password", 400));

    const user= await userModel.findOne({email}).select("+password")
    if(!user) return res.status(401).send({status:false, message: " Wrong credentials"})

    const match = await bcrypt.compare(password, user.password)     
    if(!match) return next(new ErrorHandler("Password or Emial is incorrect", 401));

    // const token = user.getJwtToken();
    // res.status(200).json({success: true, token})

    sendToken(user, 200, res)
});

//! LogOut User

exports.logOut = tryCatchError(async(req,res,next)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({success: true, message: "Loged Out"})
});


// exports.forgotPassword = tryCatchError(async(req,res,next)=>{
//     const user = await userModel.findOne({email:req.body.email})
//     if(!user) return next(new ErrorHandler("User Not Found", 404));

//     const resetToken = user.resetPasswordToken();

//     await user.save({validateBeforeSave: false});

//     const resetPasswordUrl = `http://${req.get("host)}`
// })