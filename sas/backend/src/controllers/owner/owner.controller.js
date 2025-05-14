import AsyncHandler from "../../utils/AsyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Owner from "../../models/owner/owner.model.js";
import School from "../../models/school/school.model.js";

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

    // field check
    const fieldsArray = [
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
    ];

    for (const field of fieldsArray) {
        if (!field) {
            return next(new CustomError("All fields are required", 400));
        }
    }

    // owner create

    const owner = await Owner.create({
        fullName,
        email,
        phone,
        password,
        profile,
        plan,
    });

    if (!owner) {
        return next(new CustomError("Owner not created", 400));
    }




    console.log(owner, "OWNER")

    // create school

    const school = await School.create({
        name: name,
        city: city,
        address: address,
        contactNumber: contactNumber,
        type: type,
        owner: owner._id,
    });


    if (!school) {
        return next(new CustomError("School not created", 400));
    }

    res.status(201).json({
        message: "Owner and school created succesfully",
        status: 1,
        data: {
            owner, school
        }
    })




});

export { registerOwner };
