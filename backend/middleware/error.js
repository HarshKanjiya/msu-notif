const ErrorHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal Server Error";
    

    // wronge mongoDB id error
    if(err.name === 'CastError')
    {
        const message = `Resource not found, invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    if(err.name === 'JsonWebTokenError')
    {
        const message = `Token invalid please try again`
        err = new ErrorHandler(message,400)
    }

    if(err.name === 'TokenExpiredError')
    {
        const message = `your Token is Expired Please try again`
        err = new ErrorHandler(message,400)
    }

    if(err.code === 11000)
    {
        const message = 'Account already Exist'
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success :false,
        message : err.message,
    })
}