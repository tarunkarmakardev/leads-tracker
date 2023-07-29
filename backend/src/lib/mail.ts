import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const USER = process.env.GMAIL_APP_USER;
const PASS = process.env.GMAIL_APP_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER,
    pass: PASS,
  },
  host: "smtp.gmail.com",
  port: 587,
});

type EmailVerificationMailOptions = {
  to: string;
  otp: string;
};

export async function sendEmailVerificationMail(
  params: EmailVerificationMailOptions
) {
  const options: Mail.Options = {
    from: USER,
    to: params.to,
    subject: "Please verify your Email address",
    html: `
    <p>
        Your OTP is: ${params.otp}
    </P>
    `,
  };
  try {
    const info = await transporter.sendMail(options);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.log(error);
  }
}
