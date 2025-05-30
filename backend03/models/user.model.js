import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// structure

const UserSchema = new Schema({
    fname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });





UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        throw new Error("Failed to hash password")
    }
}
)


//verify password with hash

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw new Error("Failed to compare password")
    }
}





// generate jwt token

UserSchema.methods.generateToken = function () {
    return jwt.sign({ email: this.email, id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY_TIME })
}


// model 

const User = mongoose.model("user", UserSchema);
export default User




// user object
// fname: { type: String, required: true },
// email: { type: String, required: true },
// pasword: { type: String, required: true }
// export default UserSchema