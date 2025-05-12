import jwt from "jsonwebtoken"

async function Auth(req, res, next) {
    // const token = req.cookieParser.token
    // console.log(token, "TOKEN00")

    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decode, "decode")
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }











}

export default Auth