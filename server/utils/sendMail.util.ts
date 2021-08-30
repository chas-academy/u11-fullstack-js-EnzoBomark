import nodemailer from 'nodemailer';
import config from 'config';

interface EmailDocument {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMail = (options: EmailDocument) => {
  const transporter = nodemailer.createTransport({
    service: config.get('EMAIL_SERVICE'),
    auth: {
      user: config.get('EMAIL_USERNAME'),
      pass: config.get('EMAIL_PASSWORD'),
    },
  });

  const mailOptions: EmailDocument = {
    from: config.get('EMAIL_FROM'),
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions);
};
