import nodemailer from "nodemailer";

export async function send_email(subject, to, html_output) {

  let transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "info-vente@k-val.com", // generated ethereal user
      pass: "Hello13012!",
    },
  });

  // send mail with defined transport object

  let info = await transporter.sendMail({
    from: `contact@kvaloccaz.com`, // sender address
    to: to, // list of receivers
    bcc: "contact@kvaloccaz.com",
    subject: subject, // Subject line
    html: html_output, // html body,
  });
}
