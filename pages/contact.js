import React, { useState } from 'react'
import { AiOutlineMail, AiFillPhone, AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { MdMail } from 'react-icons/md'
import { ImLocation2 } from 'react-icons/im'
import navStyles from '../styles/Contact.module.css'
import ErrorMessage from '../components/ErrorMessage'
import Head from 'next/head'
import emailjs from 'emailjs-com'




export default function Contact() {

    const [name, setName] = useState(' ')
    const [email, setEmail] = useState(' ')
    const [message, setMessage] = useState(' ')
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false
    })

    //NEEDS ENVIRONMENT VAR:
    const SERVICE_ID = "service_9vhzdop"
    const TEMPLATE_ID = "template_1r8xhao"
    const USER_ID = "FIkUrwvtra0xs9deO"

    const handleSend = async (e) => {
        e.preventDefault()

        const isValid = checkFormErrors()

        if (isValid) {
            const templateParams = {
                name: name,
                email: email,
                message: message

            }
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
                .then(result => {

                    alert('email successfully sent')

                    setName('')
                    setEmail('')
                    setMessage('')
                })
                .catch(err => console.error('ERROR ', err))
        }




        
        else {
            alert('INVALID')
        }
    }

    const checkFormErrors = () => {
        let isAllValid = true
        if (name.trim().length === 0 || !(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name.trim()))) {
            isAllValid = false
            setTouched({ ...touched, name: true })
        }
        if (email.trim().length === 0 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            isAllValid = false
            setTouched({ ...touched, email: true })
        }
        if (message.trim().length === 0) {
            isAllValid = false
            setTouched({ ...touched, message: true })
        }

        return isAllValid
    }


    return (
        <div className={navStyles.contact}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
            </Head>
            <div className={navStyles.header}><p>Send Us a Message or Question</p></div>
            <form className={navStyles.contact_form}>
                <div className={navStyles.contact_form_control}>
                    <label className={navStyles.contact_label}>Name:</label>
                    <input
                        type='text'
                        className={navStyles.contact_input}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={e => setTouched({ ...touched, name: true })}
                    >
                    </input>
                    <ErrorMessage
                        input={name}
                        checks={{ fullName: true }}
                        show={touched.name}
                        sendError={() => { }}
                        sendValid={() => { }}
                        color='yellow'
                    />
                    <ErrorMessage
                        input={name}
                        checks={{ empty: true }}
                        show={touched.name}
                        sendError={() => { }}
                        sendValid={() => { }}
                        color='yellow'
                    />
                </div>
                <div className={navStyles.contact_form_control}>
                    <label className={navStyles.contact_label}>Email:</label>
                    <input
                        type='text'
                        className={navStyles.contact_input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={e => setTouched({ ...touched, email: true })}
                    ></input>
                    <ErrorMessage
                        input={email}
                        checks={{ empty: true }}
                        show={touched.email}
                        sendError={() => { }}
                        sendValid={() => { }}
                        color='yellow'
                    />
                    <ErrorMessage
                        input={email}
                        checks={{ email: true }}
                        show={touched.email}
                        sendError={() => { }}
                        sendValid={() => { }}
                        color='yellow'
                    />
                </div>
                <div className={navStyles.contact_form_control}>
                    <label className={navStyles.contact_label}>Message:</label>
                    <textarea
                        rows='15'
                        className={navStyles.contact_textarea}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onBlur={e => setTouched({ ...touched, message: true })}
                        style={{ fontSize: 'x-large' }}
                    ></textarea>
                    <ErrorMessage
                        input={message}
                        checks={{ empty: true }}
                        show={touched.message}
                        sendError={() => { }}
                        sendValid={() => { }}
                        color='yellow'
                    />
                </div>
                <div className={navStyles.contact_form_control}>
                    <div
                        className={navStyles.contact_send_bn}
                        onClick={e => handleSend(e)}
                    >
                        Send Message
                    </div>
                </div>
            </form>


            <div className={navStyles.contact_icons}>
                <div className={navStyles.contact_icon_control}>
                    <MdMail
                        className={navStyles.contact_icon}
                    />
                    <div className={navStyles.contact_icon_label}>
                        placido.hoff@gmail.com
                    </div>
                </div>
                <div className={navStyles.contact_icon_control}>
                    <AiFillPhone
                        className={navStyles.contact_icon}
                    />
                    <div className={navStyles.contact_icon_label}>
                        401-405-6301
                    </div>
                </div>
                <div className={navStyles.contact_icon_control}>
                    <ImLocation2
                        className={navStyles.contact_icon}
                    />
                    <div className={navStyles.contact_icon_label}>
                        Providence, RI, 02907
                    </div>
                </div>
            </div>
        </div>
    )
}
