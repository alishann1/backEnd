function AsyncHandler(fb) {
    return function (req, res, next) {
        Promise.resolve(fb(req, res, next)).catch(next)
    }
}

export default AsyncHandler