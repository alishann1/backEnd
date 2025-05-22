import CustomError from "../utils/CustomError";

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return next(new CustomError("Token not found", 401))
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {

    }

}