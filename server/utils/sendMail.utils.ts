import nodemailer from 'nodemailer';

export interface EmailDocument {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMail = (options: EmailDocument) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: EmailDocument = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions);
};
