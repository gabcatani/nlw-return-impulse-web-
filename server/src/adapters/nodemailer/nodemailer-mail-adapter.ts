import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f13051d1ee1a53",
      pass: "457ed64a542ad8"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: "Equipe Trevoras 👻 <oi@feedget.com>",
            to: "Gabriel Catani <contatogcatani@gmail.com>",
            subject,
            html: body,
        })
    }
}