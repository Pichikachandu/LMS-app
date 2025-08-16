import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP configuration error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

const sendMail = async (to, otp) => {
    try {
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - LearnHub</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                body { font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
                .header { background: white; padding: 28px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; }
                .brand { display: flex; align-items: center; justify-content: center; margin-bottom: 15px; }
                .logo { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
                .brand-name { font-size: 24px; font-weight: 700; color: #1d4ed8; margin-left: 10px; }
                .content { padding: 30px 20px; background-color: #ffffff; }
                .otp-box { 
                    background-color: #f8fafc; 
                    border-left: 4px solid #4f46e5;
                    padding: 15px 20px;
                    margin: 25px 0;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 4px;
                    text-align: center;
                    color: #1e293b;
                }
                .footer { 
                    margin-top: 30px; 
                    padding-top: 20px; 
                    border-top: 1px solid #e2e8f0;
                    font-size: 12px;
                    color: #64748b;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 20px 0;
                    background-color: #4f46e5;
                    color: white !important;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: 500;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="brand">
                        <div class="logo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <span class="brand-name">LearnHub</span>
                    </div>
                    <h1 style="color: #1e40af; margin: 15px 0 0; font-size: 22px; font-weight: 600;">Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>We received a request to reset your password for your LMS account. Please use the following One-Time Password (OTP) to proceed:</p>
                    
                    <div class="otp-box">
                        ${otp}
                    </div>
                    
                    <p>This OTP is valid for <strong>5 minutes</strong>. For security reasons, please do not share this code with anyone.</p>
                    
                    <p>If you didn't request this password reset, you can safely ignore this email. Your account remains secure.</p>
                    
                    <p style="margin-bottom: 0;">Best regards,</p>
                <p style="margin: 5px 0 0 0; font-weight: 500;">The LearnHub Team</p>
                </div>
                <div class="footer" style="margin-top: 40px; padding: 20px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">© ${new Date().getFullYear()} LearnHub. All rights reserved.</p>
                    <p style="margin: 0; font-size: 11px; color: #9ca3af;">This is an automated message, please do not reply to this email.</p>
                    <div style="margin-top: 12px;">
                        <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="24" height="24" style="opacity: 0.6; transition: opacity 0.2s;">
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" height="24" style="opacity: 0.6; transition: opacity 0.2s;">
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="24" height="24" style="opacity: 0.6; transition: opacity 0.2s;">
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        await transporter.sendMail({
            from: `"LMS Support" <${process.env.SMTP_MAIL}>`,
            to: to,
            subject: "🔒 Reset Your Password - LearnHub",
            html: emailHtml
        });
        console.log(`OTP email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export default sendMail;