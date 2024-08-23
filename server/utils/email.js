import { createTransport } from 'nodemailer';
import pug from 'pug'
// new Email(user, url).sendWelcome();

export default class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Supachai Sinkaseam<${process.env.EMAIL_FROM}>`;
    }

    createTransport(){
        if(process.env.NODE_ENV === 'production'){
            // Sendgrid
            return 1;
        }
        return createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
            // Active in gmail "less secure app" option
        });
    }
    
    // Send the actual email
    send(template, subject){
        // 1.) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`)
        
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: options.message,
            // html: 
        };

        // 3) Create a transport and send email

    }


    sendWelcome(){
        this.send('welcome', 'Welcome to the Natours Family!');
    } 
}

const sendEmail = async (options) => {
    // 2) Define the email options
    const mailOptions = {
        from: "Supachai Sinkaseam<test27102000@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: 
    }
    // 3) Actually send the email
    await transporter.sendMail(mailOptions)
};

