import SendMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import { emailTemplate } from '../../utils/templates/verifyEmail'

dotenv.config()

const SENDGRIDKEY = process.env.SENDGRID_API_KEY as string

SendMail.setApiKey(SENDGRIDKEY)

export const mailVerification = async (
    firstName: string,
    email: string,
    verificationCode: string
) => {
    const verifyEmailUrl = `/auth/confirm/${verificationCode}`;

    const msg = {
        to: email,
        from: 'azunna.onugha@outlook.com',
        subject: 'Welcome to Swift-Spur',
        text: `Verify your account`,
        html: emailTemplate(firstName, verifyEmailUrl)
    ,
    }

    SendMail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
}
