import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";
import { MailOptions } from "nodemailer/lib/json-transport";
interface IMailOption {
    to: string | string[];
    html: string;
    subject: string;
    cc?: string | string[];
    bcc?: string| string[];
    attachments?: any[],
}

export const sendEmail = async({html, subject, to, attachments, bcc, cc}:IMailOption)=>{
    try{
// const {html, subject, to, attachments, bcc, cc} = options;

const mailOPtions: MailOptions = {
    to: to,
    from: ENV_CONFIG.SMTP_MAIL_FROM,
    subject: subject,
    html: html,
};
if(cc){
    mailOPtions["cc"]=cc;
}
if(bcc){
    mailOPtions["bcc"]=bcc;
}
if(attachments){
    mailOPtions["attachments"]= attachments;
}

await transporter.sendMail(mailOPtions);



        console.log("mail sent");
        
    }catch(error){
        console.log(error);
    }
}