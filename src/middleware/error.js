const ErrorHandler = require('../errorsHandlers/errorHandler');

module.exports = (err, req, res, next) => {
    
  err.statusCode = err.statusCode || 400;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    const message = `The requested resource could not be found. Invalid id: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
    // error:error.stack
  });
};
 