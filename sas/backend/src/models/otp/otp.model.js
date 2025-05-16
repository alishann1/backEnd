import mongoose, { Schema } from "mongoose";


const otpSchema = new Schema({
    email: {
        type: Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpiry: {
        type: Date,
        require: true
    },
    lastOtpSentAt: {
        type: Date,
        require: true
    }
}, { timestamps: true })


const Otp = mongoose.model("Otp", otpSchema);
export default Otp
