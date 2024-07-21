import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Mailjet from "node-mailjet";
import { db } from "@/server/db";

interface sendMail {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

const sendEmail = async ({ email, name, userId }: sendMail) => {
  try {
    const mjApiKeyPublic = process.env.MJ_APIKEY_PUBLIC
    if (!mjApiKeyPublic) {
      throw new Error("MJ_APIKEY_PUBLIC is required")
    }
    const mjApiKeyPrivate = process.env.MJ_APIKEY_PRIVATE

    if(!mjApiKeyPrivate){
      throw new Error("MJ_APIKEY_PRIVATE is required")
    }

    const mailjet = new Mailjet({
        apiKey: mjApiKeyPublic,
        apiSecret: mjApiKeyPrivate,
      });
      
      const sendOtp = async (otp, email, name) => {
        const request = mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: {
                Email: "rajvardhanranawat80@gmail.com",
                Name: "Rajvardhan",
              },
              To: [
                {
                  Email: `${email}`,
                  Name: `${name}`,
                },
              ],
              Subject: "Verify your Email ",
              TextPart: `Dear ${name} this is your OTP for creating your account ${otp}`,
              HTMLPart: `
                    <html>
                      <head>
                        <style>
                          .email-container {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            background-color: #f9f9f9;
                            border: 1px solid #ddd;
                            max-width: 600px;
                            margin: 0 auto;
                          }
                          .email-content {
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 5px;
                          }
                          .email-footer {
                            text-align: center;
                            color: #777;
                            font-size: 12px;
                            margin-top: 20px;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="email-container">
                          <div class="email-content">
                            <h2>Dear ${name},</h2>
                            <p>This is your OTP for creating your account with us:</p>
                            <h1>${otp}</h1>
                            <p>Please use this OTP to complete your registration.</p>
                          
                          </div>
                        
                        </div>
                      </body>
                    </html>
                  `,
            },
          ],
        });
      
        request
          .then((result) => {
            console.log(result.body);
          })
          .catch((err) => {
            console.log(202, `Unable to send otp ${err.message}`);
          });
      };

   
     const otp = Math.floor(10000000 + Math.random() * 90000000); // Generate 8 digit random number
     await sendOtp(otp, email, name); // Send OTP via email Mailjet

   let user = await db.user.update({
        where : {
            id : userId
        },
        data : {
            otp: otp
        }
     })
      
  } catch (error) {
    console.log("Error sending email", error);
  }
};

export default sendEmail;
