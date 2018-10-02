import * as nodemailer from 'nodemailer';
import { Service } from 'typedi';
import { updateError } from '../tools/errorTools';

@Service()
export default class SendEmailProvider {
    private senderMailAddress = 'ninjasShop@mail.com';

    private transporter = nodemailer.createTransport({
        port: 1025,
        ignoreTLS: true,
    });

    public async sendEmail(to, subject, text, html?) {
        try {
            return await this.transporter.sendMail({
                from: this.senderMailAddress,
                to,
                subject,
                text,
                html,
            });
        } catch (e) {
            throw updateError(e, 'Can\'t send email');
        }
    }
}
