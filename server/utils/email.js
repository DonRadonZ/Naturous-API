import { createTransport } from 'nodemailer';
import pug from 'pug'
import htmlToText from 'html-to-text'
// new Email(user, url).sendWelcome();

export default class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Supachai Sinkaseam<${process.env.EMAIL_FROM}>`;
    }

    newTransport(){
        if(process.env.NODE_ENV === 'production'){
            // Sendgrid
            return 1;
        }
        return createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
            // Active in gmail "less secure app" option
        });
    }
    
    // Send the actual email
    async send(template, subject){
        // 1.) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })
        
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html),
            // html: 
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }


    async sendWelcome(){
        await this.send('welcome', 'Welcome to the Natours Family!');
        
    } 

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)')
    }
}