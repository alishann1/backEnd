import Otp from "../models/otp/otp.model";

async function cleanOtp(ownerId) {
    const isOtpExist = await Otp.findOne({ email: ownerId });

    //chek 

    if (isOtpExist) {
        const timeDifference = (Date.now() - isOtpExist.lastOtpSentAt) / 1000; //in seconds
    }
}