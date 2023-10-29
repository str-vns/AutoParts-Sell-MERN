const nodemailer = require('nodemailer');

const sendEmail =  async options => {
 const transporter = nodemailer.createTransport(
    {
        host: process.env.STMP_HOST,
        port:  process.env.STMP_PORT,
        auth:{
            user: process.env.STMP_EMAIL,
            pass: process.env.STMP_PASSWORD
        }
    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: `<p>${options.message}</p>`
    }
    
    await transporter.sendMail(message)
}

module.exports = sendEmail;