import AsyncHandler from "../../utils/AsyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Owner from "../../models/owner/owner.model.js";
import School from "../../models/school/school.model.js";
import generateOTP from "../../utils/generateOTP.js";
import Otp from "../../models/otp/otp.model.js";
import sendEmail from "../../utils/sendEmail.js";
import htmlTemplate from "../../utils/emailHTMLTemplate.js";
import uploadImage from "../../utils/cloudinary.js";

// const registerOwner = async function (req, res, next) {
//     res.send("register owner")
//     // new CustomError("This is a custom error", 404, { data: null })
// }

const registerOwner = AsyncHandler(async function (req, res, next) {
    // get fields
    const {
        fullName,
        email,
        phone,
        password,
        profile,
        plan,
        name,
        city,
        address,
        contactNumber,
        type,
    } = req.body;

    console.log(req.body)
    let secureUrl
    const { file } = req
    if (file) {
        const localpath = file.path
        try {
            const imageUpload = await uploadImage(localpath);
            if (!imageUpload) {
                return next(new CustomError("Image upload failed", 500))
            }

            secureUrl = imageUpload.secure_url
            console.log(secureUrl, "SECURE URL")
        } catch (error) {
            return next(new CustomError("Image upload failed", 500))
        }
    }


    // field check
    const fieldsArray = [
        fullName,
        email,
        phone,
        password,
        // profile,
        plan,
        name,
        city,
        address,
        contactNumber,
        type,
    ];



    for (const field of fieldsArray) {
        if (!field) {
            return next(new CustomError("All fields are required", 9000));
        }
    }

    // owner create

    const owner = await Owner.create({
        fullName,
        email,
        phone,
        password,
        profile: secureUrl || undefined,
        plan,
    });

    if (!owner) {
        return next(new CustomError("Owner not created", 407980));
    }

    console.log(owner, "OWNER");

    // create school

    const school = await School.create({
        name: name,
        city: city,
        address: address,
        contactNumber: contactNumber,
        type: type,
        owner: owner._id,
    });

    // generate otp

    const ownerOtp = generateOTP();
    // email send

    try {
        const info = await sendEmail(
            owner.email,
            "OTP Verification",
            htmlTemplate(owner.fullName, ownerOtp)
        );
        if (info) {
            const otp = await Otp.create({
                email: owner._id,
                otp: ownerOtp,
                otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
                lastOtpSentAt: Date.now(),
            });
            if (!otp) {
                return next(new CustomError("Otp not created", 4780));
            }
        }
    } catch (error) {
        console.log(error);
        return next(new CustomError("Email send failed", 6867));
    }

    if (!school) {
        return next(new CustomError("School not created", 79879));
    }

    res.status(201).json({
        message: "Owner and school created succesfully",
        status: 1,
        data: {
            owner,
            school,
        },
    });
});

// verify otp
const verifyOtp = AsyncHandler(async (req, res, next) => {
    const { otp, email } = req.body;
    // email check
    const isEmailExist = await Owner.findOne({ email });
    if (!isEmailExist) {
        return next(new CustomError("Email not found", 404));
    }

    //
    if (isEmailExist) {
        const otpData = await Otp.findOne({ email: isEmailExist._id });

        if (!otpData) {
            return next(new CustomError("Otp not found", 404));
        }

        if (otpData.otpExpiry < Date.now()) {
            return next(new CustomError("Otp expired", 404));
        }

        if (otpData.otp !== otp) {
            return next(new CustomError("Otp not matched", 404));
        }

        await Owner.updateOne({ _id: isEmailExist._id }, { isVerify: true });
        //  clear otp
        await Otp.deleteOne({ email: isEmailExist._id });

        res.json({
            message: "OTP VERIFIED SUCCESFULLY",
            status: 1,
        });
    }
});

// resend-otp

const resendOtp = AsyncHandler(async (req, res, next) => {
    const { email } = req.body;

    // check
    const isEmailExist = await Owner.findOne({ email });
    if (!isEmailExist) {
        return next(new CustomError("Email not found", 404));
    }

    //  check user already verify or not
    if (isEmailExist.isVerify) {
        return next(new CustomError("User already verify", 404));
    }

    //
    // clean otp

    try {
        await cleanOtp(isEmailExist._id);
        // generate otp
        const newOTP = generateOTP();

        // Email send
        const result = await sendEmail(
            isEmailExist.email,
            "OTP resend verication",
            htmlTemplate(isEmailExist.fullName, newOTP)
        );
        if (!result) {
            return next(new CustomError("Email not send", 404));
        }

        //  create otp object on otp model
        const otp = await Otp.create({
            email: isEmailExist._id,
            otp: newOTP,
            otpExpiry: Date.now() + 10 * 60 * 1000,
            lastOtpSentAt: Date.now(),
        });

        if (!otp) {
            return next(new CustomError("Otp not created", 422));
        }

        res.json({
            message: "Otp resend successfully",
            status: 1,
        });
    } catch (error) {
        return next(error);
    }
});


const imageUpload = AsyncHandler(async (req, res, next) => {
    const { file } = req
    console.log(file, "FILE")
    if (!file) {
        return next(new CustomError("Image not found", 404))
    }

    //file upload to cloudinary 

    const imageObj = await uploadImage(file.path)
    if (!imageObj)

        res.json({
            message: "Image uploaded successfully",
            status: 1,
        })
})



export { registerOwner, verifyOtp, resendOtp, imageUpload };
