import twilio from 'twilio'
import { createTransport } from 'nodemailer'
import logger from '../Tools/logger.js'

//const accountSid = process.env.accountSid
//const authToken = process.env.authToken

const client = twilio(process.env.accountSid, process.env.authToken)

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.Mailer_User,
        pass: process.env.Mailer_Pass
    }
})

const NotificationController = {
    SendWhatsApp: async (MsgTxt, DesNum) =>{
        const mensaje = {
            body: MsgTxt, 
            from: 'whatsapp:+14155238886',       
            to: `whatsapp:${DesNum}`,
        }
        try {
            await client.messages.create(mensaje)
            logger.trace(`WhatsApp enviado a ${DesNum}`)
        } catch (error) {
            throw error
        }
    },

    SendSMS: async (MsgTxt, DesNum) =>{
        const options = {
            body: MsgTxt,
            from: '+15708522795',
            to: DesNum
        }
        
        try {
            await client.messages.create(options)
            logger.trace(`SMS enviado a ${DesNum}`)
        } catch (error) {
            throw error
        }
    },
    
    SendMail: async (Msghtml, DesEmail, subject) =>{
        const mailOptions = {
            from: 'Servidor Node.js',
            to: DesEmail,
            subject: subject,
            html: Msghtml,
        }
        
        try {
            await transporter.sendMail(mailOptions)
            logger.trace(`Email enviado a ${DesEmail}`)
        } catch (error) {
            throw error
        }

    }
}

export default NotificationController
