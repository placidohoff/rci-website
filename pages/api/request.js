// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mail = require('@sendgrid/mail')
// const emailjs = require('@emailjs/browser')
const emailjs = require('emailjs-com')
// import {SERVICE_ID, TEMPLATE_ID, USER_ID} from '../../var'
// import{ init } from '@emailjs/browser';
// init("FIkUrwvtra0xs9deO");
require('dotenv').config()

// mail.setApiKey(process.env.SENDGRID_API_KEY)

export default function handler(req, res) {
  if (req.method === 'POST') {
    // const body = JSON.parse(req.body)
    // const {body} = req
    // const body = req.body
    const message = `
    Request for service from \r\n
    Name: ${req.body.firstname} ${req.body.lastname} \r\n
    Email: ${req.body.email} \r\n
    Phone Number: ${req.body.phonenumber} \r\n
    Address: ${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.zip} \r\n
    Type of Work: ${req.body.service} \r\n
    More Details: ${req.body.details}
  `

    const templateParams = {
      from_name: 'Test Sender',
      to_name: 'Test Reciever',
      message: "req.body.firstname,",
      reply_to: 'placido.hoff@gmail.com'
    }

    // res.send('testing..')

    // mail.send({
    //   to: 'placido.hoff@gmail.com',
    //   from: 'sweetflow401@gmail.com',
    //   subject: 'New Customer Request',
    //   text: message,
    //   html: message.replace(/\r\n/g, '<br>')
    // }).then(() => {
    //   res.status(200).json({ status: 'OK' })
    // })


    emailjs.send('service_9vhzdop', 'template_9q736er', templateParams, 'FIkUrwvtra0xs9deO')
      .then(result => {
        res.send('Email Success')
        console.log('email successfully sent')
      })
      .catch(err => console.error('ERROR ', err))
      res.send('negative ', )

    {
      // res.send('negative..')
    }
  }
  else {
    res.send('hello world')
  }


}
