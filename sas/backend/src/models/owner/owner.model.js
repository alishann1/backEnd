import { Schema } from "mongoose";

const ownerSchema = new Schema(
    {
        fullname: {
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
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        paskage: {
            type: String,
            default: "free"
        }
    },
    {
        timestamps: true,
    },
);

const Owner = mongoose.model("Owner", ownerSchema);
