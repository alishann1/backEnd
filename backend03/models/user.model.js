import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// structure

const UserSchema = new Schema({
    fname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });



// model 

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
const user = mongoose.model("user", UserSchema);

export default user



// user object
// fname: { type: String, required: true },
// email: { type: String, required: true },
// pasword: { type: String, required: true }

// export default UserSchema