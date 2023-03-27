'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.mailVerification = void 0
const mail_1 = __importDefault(require('@sendgrid/mail'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const SENDGRIDKEY = process.env.SENDGRID_API_KEY
mail_1.default.setApiKey(SENDGRIDKEY)
const mailVerification = async (firstName, email, verificationCode) => {
    const msg = {
        to: email,
        from: 'azunna.onugha@outlook.com',
        subject: 'Welcome to Swift-Spur',
        text: `Verify your account`,
        html: `<h2> Hello ${firstName} </h2>
    <p>Welcome to SWift Spur!</p>
    <p>Please verify your account using code: <strong>${verificationCode}</strong> </p>`,
    }
    mail_1.default
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
}
exports.mailVerification = mailVerification
