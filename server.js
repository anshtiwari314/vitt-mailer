const express = require("express")
const nodemailer = require('nodemailer');
const cors= require('cors')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT|| 5000
app.use(cors({
    origin:'*'
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


console.log(process.env.SENDER_MAIL)

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.APP_PASS,
    },
  });


function sendMails(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(`Error:`,error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
app.post('/vitt-ai-send-mail',(req,res)=>{
    console.log("send-mail trigerred",req.body)
    const mailOptions = {
        from: process.env.SENDER_MAIL,
        to: "bibhuti@vitt.ai,saurabhahlawat@vitt.ai",
        subject: `vitt.ai form submission ,${req.body.name}`,
        text: `${req.body.message} \n\n\nName:${req.body.name} \nMobile: ${req.body.mobile} \nEmail: ${req.body.email}`
      };
     sendMails(mailOptions)
    res.json({result:"ok"})
})

app.listen(PORT,()=>{
    console.log(`server is live at ${PORT}`)
})