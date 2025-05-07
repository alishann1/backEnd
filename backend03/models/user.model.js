import { Schema } from "mongoose";

// structure

const UserSchema = new Schema({
    fname: { type: String, required: true },
    email: { type: String, required: true },
    pasword: { type: String, required: true }
}, { timestamps: true });



// model 
const user = mongoose.model("user", UserSchema);

export default user



// user object
// fname: { type: String, required: true },
// email: { type: String, required: true },
// pasword: { type: String, required: true }

// export default UserSchema