import Otp from "../models/otp/otp.model.js";

    async function cleanOtp(ownerId) {
    const isOtpExist = await Otp.findOne({ email: ownerId });

    //check 

    if (isOtpExist) {
        const timeDiff = (Date.now() - isOtpExist.lastOtpSentAt) / 1000; //in seconds
        if (timeDiff < 60) {
            throw new Error("Please wait")
        }
        await Otp.deleteOne({ _id: isOtpExist._id });
        return true
    }
    return false
}

export default cleanOtp