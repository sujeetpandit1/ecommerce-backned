const ErrorHandler = require("../errorsHandlers/errorHandler");
const tryCatchError = require("../middleware/tryCatchError");
const jwt = require('jsonwebtoken');
const userModule = require("../modules/userModule");



exports.isAuthenticatedUser = tryCatchError(async(req, res, next)=>{
    const {token}= req.cookies;
    if(!token) return next(new ErrorHandler("Please Login To Access The Benefits", 401));

    decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModule.findById(decodedToken._id);

    next();
});

exports.authorizedRole = (...role) =>{
    return (req, res, next) =>{
        if(!role.includes(req.user.role)){
            return next (new ErrorHandler(`Role ${req.user.role} is not allowed to access`, 403)
        )};
        next();
    }
    
};