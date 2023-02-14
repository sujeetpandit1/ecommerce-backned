const sendToken = (user, statusCode, res) =>{

const token = user.getJwtToken();
const daysToExpire = parseInt(process.env.COOKIE_EXPIRE) ;
const expires = new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000);

const options = {
  expires,
  httpOnly: true
};
console.log(options);

    res.status(statusCode).cookie('token', token, options).json({success: true, user, token})
}

module.exports= sendToken 