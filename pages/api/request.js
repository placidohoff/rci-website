// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mail = require('@sendgrid/mail')
require('dotenv').config()

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default function handler(req, res) {
  const body = JSON.parse(req.body)

  const message = `
    Request for service from \r\n
    Name: ${body.firstname} ${body.lastname} \r\n
    Email: ${body.email} \r\n
    Phone Number: ${body.phonenumber} \r\n
    Address: ${body.address}, ${body.city}, ${body.state}, ${body.zip} \r\n
    Type of Work: ${body.service} \r\n
    More Details: ${body.details}
  `

  mail.send({
    to: 'placido.hoff@gmail.com',
    from: 'sweetflow401@gmail.com',
    subject: 'New Customer Request',
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  }).then(() => {
    res.status(200).json({ status: 'OK' })
  })

  
}
