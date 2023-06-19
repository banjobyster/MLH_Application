import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.EMAIL;
const pass = process.env.EMAIL_PSWD;

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});

export const sendEmail = (email, newPassword) => {
    return new Promise((resolve, reject) => {
      transport.sendMail(
        {
          from: user,
          to: email,
          subject: "Muneem Jee Login Configuration",
          html: ``,
        },
        (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
};
  