async function errorMiddleware(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    if (err.code === 11000) {
        message = "Duplicate key error",
            statusCode = 409
    }



    res.status(statusCode).json({
        message: message,
        statusCode: statusCode,
        data: err.data
    })
}

export default errorMiddleware

// {message : "dsjlfjsaf", statusCode : 404, data : null}