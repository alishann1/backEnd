import User from "../models/user.model.js";


async function registerUser(req, res, next) {
    // get values
    const { fname, email, password } = req.body;
    //check
    if (!fname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    //createuser
    //mongodb

    const user = await User.create({ fname, email, password });
    if (!user) {
        return res.status(400).json({ message: "Failed to create user" });
    }

    res.status(201).json({
        message: "User created successfully",
        user: user
    });
}

export default registerUser