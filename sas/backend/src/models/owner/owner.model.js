import { Schema } from "mongoose";
import mongoose from "mongoose";

import bcryptjs from "bcryptjs";

const ownerSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        profile: {
            type: String,
            required: false
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        plan: {
            type: String,
            default: "free",
        },
    },
    {
        timestamps: true,
    }
);

ownerSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }
    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
});

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
