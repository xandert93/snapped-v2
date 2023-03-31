import nodemailer from 'nodemailer';

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER_ADDRESS,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const createAndSendEmail = async ({ recipient, subject, htmlMessage, emailType }) => {
  const emailConfig = {
    from: `snapped! Support <${process.env.SMTP_EMAIL}>`, //sender email address - usually via `${process.env.SMTP_EMAIL}`
    to: recipient.email, //receiver email address, or comma-separated String of receiver addresses
    subject,
    html: `<div>
            <p>Hi, ${recipient.firstName}!</p>
            ${htmlMessage}
            <p>All the best,</p>
            <p>- Team snapped!</p>
          </div>
            `,
  };

  await emailTransporter.sendMail(emailConfig);
  return `${emailType} email sent!`;
};
