module.exports = function (error, request, response) {
    if (typeof error !== object) {
        return response.json(error);
    }

    response.status(error.status || 500);
    response.json({
        message: error.message,
        error: error
    });

    console.log(error);
};
