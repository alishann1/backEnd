import nodemailer from "nodemailer";


async function sendEmail(to, subject, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.Email,
                pass: process.env.PASS_KEY

            }
        })


        const info = await transporter.sendMail({
            from: `"Schoolify" <${process.env.Email}>`,
            to: to,
            subject: subject,
            html: message
        })
        return info
    } catch (error) {
        throw new Error(error)
    }

}

export default sendEmail