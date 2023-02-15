const ErrorHandler = require('../errorsHandlers/errorHandler');

module.exports = (err, req, res, next) => {
    
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    const message = `The requested resource could not be found. Invalid id: ${err.path}`;
    err = new ErrorHandler(message, 400);
  };

  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    err = new ErrorHandler(message, 400)
  };

  if(err.code === "JsonWebTokenError"){
    const message = `JSON Web token is invalid`;
    err = new ErrorHandler(message, 400)
  };

  if(err.code === "TokenExpiredError"){
    const message = `JSON Web token is Expired`;
    err = new ErrorHandler(message, 400)
  };

  if (err.name === 'ValidationError') {
    const message = `Please Enter Correct Id: ${err.message}`;
    err = new ErrorHandler(message, 400);
  };

  res.status(err.statusCode).json({
    success: false,
    message: err.message
    // error:error.stack
  });
};
 