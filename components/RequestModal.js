import { useState } from 'react'
import Modal from 'react-modal'
import modalStyles from '../styles/Modal.module.css'
import Select from 'react-select'
import ErrorMessage from './ErrorMessage'
import emailjs from 'emailjs-com'
// import fetch from 'node-fetch'

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '30px',
        borderRadius: '30px',
        border: '5px solid yellow',
        // backgroundColor: '#FFEB01',
        backgroundColor: '#C4C4C4',
        fontWeight: 'bold',
        height: '600px'
        // color: 'blue'
    },
}




export default function RequestModal({ isOpen, closeModalFn, options, val }) {

    const [isError, setIsError] = useState(true)

    let formErrors = {
        isFirstNameError: true,
        isLastNameError: true,
        isEmailError: true,
        isPhoneNumberError: true,
        isServiceAddressError: true,
        isCityError: true,
        isStateError: true,
        isZipError: true
    }

    const [touched, setTouched] = useState(
        {
            services: false,
            date: false,
            firstName: false,
            lastName: false,
            email: false,
            phone: false,
            address: false,
            city: false,
            state: false,
            zip: false
        })
    const [requestedServices, setRequestedServices] = useState([options[val]])
    const [date, setDate] = useState(new Date().toDateString())
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [_state, set_State] = useState('')
    const [zip, setZip] = useState('')
    const [details, setDetails] = useState('')

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        // const formData = {}
        let isFormValid = true

        //TODO: Will check all form inputs, passing each to checkFormErrors(). Only if all pass the checks will the form be considered valid

        // if (isFormValid) {
        //     Array.from(e.currentTarget.elements).forEach(field => {
        //         if (!field.name) return

        //         formData[field.name] = field.value
        //     })
        //     alert('Form is valid')
        // } else {
        //     alert('Form is invalid')
        // }

        let isAllValid = checkFormErrors()
        // alert(isAllValid)
        // console.log(requestedServices)

        if (isAllValid) {
            // alert('Form is valid')
            const formData = getFormData()
            // await fetch('/api/request/', {
            //     method: 'POST',
            //     body: JSON.stringify(formData)
            // }).then(response => {
            //     console.log(response)
            // })


            const message = `
    Request for service from \r\n
    Name: ${firstName} ${lastName} \r\n
    Email: ${email} \r\n
    Phone Number: ${phone} \r\n
    Address: ${address}, ${city}, ${_state}, ${zip} \r\n
    Type of Work: ${requestedServices[requestedServices.length - 1].value} \r\n
    More Details: ${details}
  `
            const templateParams = {
                from_name: 'Test Sender',
                to_name: 'Test Reciever',
                message: message,
                reply_to: 'placido.hoff@gmail.com'
            }
            await emailjs.send('service_9vhzdop', 'template_9q736er', templateParams, 'FIkUrwvtra0xs9deO')
                .then(result => {
                    // res.send('Email Success')
                    console.log('email successfully sent')
                })
                .catch(err => console.error('ERROR ', err))

        } else {
            alert('Please clear the form of all errors')
        }

        // console.log(formErrors)



        // await fetch('/api/request', {
        //     method: 'POST',
        //     body: JSON.stringify(formData)
        // })
    }

    const getFormData = () => {
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            city: city,
            state: _state,
            zip: zip,
            details: details,
            service: requestedServices[requestedServices.length - 1]

        }
    }

    //I HAVE TWO HANDLERS CAUSE I CAN'T SEEM TO PASS THE BOOL WITH IT, ONLY THE NAME.. SO THE BOOL IS THE FUNCTION ITSELF:
    const handleError = (errorName, bool) => {
        // setFormErrors({...formErrors, [errorName]:true})
        formErrors = { ...formErrors, [errorName]: true }
    }

    const handleValid = (errorName, bool) => {
        // setFormErrors({...formErrors, [errorName]:false})
        formErrors = ({ ...formErrors, [errorName]: false })
    }

    const checkFormErrors = () => {
        let isAllValid = true
        //TODO: Go thru all form state values and run checks on them. If any fail, set isAllValid to false. At the end return isAllValid

        //SERVICES:
        if (requestedServices[requestedServices.length - 1].length == 0) {
            isAllValid = false
        }

        //DATE:
        if (new Date(date) < new Date()) {
            isAllValid = false
        }
        //FIRSTNAME:
        if (/\d/.test(firstName) || firstName.length < 2 || firstName.length > 20 || firstName.includes(' ')) {
            isAllValid = false
        }
        //LASTNAME:
        if (/\d/.test(lastName) || lastName.length < 2 || lastName.length > 20 || lastName.includes(' ')) {
            isAllValid = false
        }
        //EMAIL:
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            isAllValid = false
        }
        //PHONE:
        if (!(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone))) {
            isAllValid = false
        }
        //ADDRESS:
        if (!(/^\d+\s[A-z]+\s[A-z]+/.test(address))) {
            isAllValid = false
        }
        if (/\d/.test(city) || city.length < 2 || city.length > 20) {
            isAllValid = false
        }
        if (/\d/.test(_state) || _state.length < 2 || _state.length > 20) {
            isAllValid = false
        }

        if (!(/^\d{5}$|^\d{5}-\d{4}$/.test(zip))) {
            isAllValid = false
        }

        return isAllValid
    }

    return (
        <div style={{ marginRight: '10px' }}>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModalFn}
                contentLabel='Request Service'
                style={styles}
                className={styles.modal}
            >
                <form
                    method='post'
                    onSubmit={handleOnSubmit}
                    className={modalStyles.form}
                >
                    <div className={modalStyles.head}>
                        <div className={modalStyles.headLeft} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <h2 style={{ marginRight: '10px' }}>Requested Service(s):</h2>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Select
                                    defaultValue={options[val]}
                                    className='basic-multi-select'
                                    options={options}
                                    onClick={() => setTouched({ ...touched, services: true })}
                                    // value={requestedServices}
                                    isMulti
                                    name='service'
                                    onChange={(e) => { setRequestedServices([...requestedServices, e]); setTouched({ ...touched, services: true }) }}
                                />
                                <ErrorMessage
                                    input={requestedServices[requestedServices.length - 1]}
                                    // input={requestedServices}
                                    checks={{ dataType: 'services' }}
                                    show={touched.services}
                                    // show={true}
                                    sendError={() => handleError('isDateError')}
                                    sendValid={() => handleValid('isDateError')}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button className={modalStyles.close} onClick={closeModalFn}>Exit</button>
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px', justifyContent: 'flex-start' }} className={modalStyles.row}>
                        <div style={{ marginRight: '15px' }}>Requested Start-Date:</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                name='date'
                                value={date}
                                onClick={() => setTouched({ ...touched, date: true })}
                                onChange={(e) => setDate(e.target.value)}
                                className={modalStyles.smallIn}
                                type='date'
                                min={new Date()}
                            />
                            <ErrorMessage
                                input={date}
                                checks={{ dataType: 'date' }}
                                show={touched.date}
                                sendError={() => handleError('isDateError')}
                                sendValid={() => handleValid('isDateError')}
                            />
                        </div>
                    </div>


                    <div className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>First Name</div>
                            <input type='text'
                                onClick={() => setTouched({ ...touched, firstName: true })}
                                onChange={(e) => setFirstName(e.target.value)}
                                name="firstname"
                                className={modalStyles.smallIn}
                                value={firstName}
                            />
                            {
                                <ErrorMessage
                                    input={firstName}
                                    checks={{ minLength: 1, maxLength: 20, dataType: 'string', noSpaces: true }}
                                    show={touched.firstName}
                                    sendError={() => handleError('isFirstNameError')}
                                    sendValid={() => handleValid('isFirstNameError')}
                                />
                            }

                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>Last Name</div>
                            <input
                                type='text'
                                name="lastname"
                                className={modalStyles.smallIn}
                                onClick={() => setTouched({ ...touched, lastName: true })}
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                            {
                                <ErrorMessage
                                    input={lastName}
                                    checks={{ minLength: 1, maxLength: 20, dataType: 'string', noSpaces: true }}
                                    show={touched.lastName}
                                    sendError={() => handleError('isLastNameError')}
                                    sendValid={() => handleValid('isLastNameError')}
                                />
                            }
                        </div>
                    </div>
                    <div className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>Email</div>
                            <input
                                type='text'
                                name="email"
                                className={modalStyles.smallIn}
                                onClick={() => setTouched({ ...touched, email: true })}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            {
                                <ErrorMessage
                                    input={email}
                                    checks={{ email: true }}
                                    show={touched.email}
                                    sendError={() => handleError('isEmailError')}
                                    sendValid={() => handleValid('isEmailError')}
                                />
                            }
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>Phone Number</div>
                            <input
                                type='text'
                                name="phonenumber"
                                className={modalStyles.smallIn}
                                onClick={() => setTouched({ ...touched, phone: true })}
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                            {
                                <ErrorMessage
                                    input={phone}
                                    checks={{ phoneNumber: true }}
                                    show={touched.phone}
                                    sendError={() => handleError('isPhoneNumberError')}
                                    sendValid={() => handleValid('isPhoneNumberError')}
                                />
                            }
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }} className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>Service Address</div>
                            <input
                                type='text'
                                name="address"
                                className={modalStyles.longIn}
                                onClick={() => setTouched({ ...touched, address: true })}
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                            {
                                <ErrorMessage
                                    input={address}
                                    checks={{ address: true }}
                                    show={touched.address}
                                    sendError={() => handleError('isServiceAddressError')}
                                    sendValid={() => handleValid('isServiceAddressError')}
                                />
                            }
                        </div>
                    </div>
                    <div className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>City</div>
                            <input
                                type='text'
                                name="city"
                                className={modalStyles.smallIn}
                                onClick={() => setTouched({ ...touched, city: true })}
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                            />
                            {
                                <ErrorMessage
                                    input={city}
                                    checks={{ dataType: 'string' }}
                                    show={touched.city}
                                    sendError={() => handleError('isCityError')}
                                    sendValid={() => handleValid('isCityError')}
                                />
                            }
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>State</div>
                            <input
                                type='text'
                                name="state"
                                className={modalStyles.smallerIn}
                                onClick={() => setTouched({ ...touched, state: true })}
                                onChange={(e) => set_State(e.target.value)}
                                value={_state}
                            />
                            {
                                <ErrorMessage
                                    input={_state}
                                    checks={{ dataType: 'string' }}
                                    show={touched.state}
                                    sendError={() => handleError('isStateError')}
                                    sendValid={() => handleValid('isStateError')}
                                />
                            }
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>Zip</div>
                            <input
                                type='text'
                                name="zip"
                                className={modalStyles.smallerIn}
                                onClick={() => setTouched({ ...touched, zip: true })}
                                onChange={(e) => setZip(e.target.value)}
                                value={zip}
                            />
                            {
                                <ErrorMessage
                                    input={zip}
                                    checks={{ zipCode: true }}
                                    show={touched.zip}
                                    sendError={() => handleError('isZipError')}
                                    sendValid={() => handleValid('isZipError')}
                                />
                            }
                        </div>
                    </div>
                    <div className={modalStyles.detailsrow}>
                        <div className={modalStyles.inputControl}>
                            <div>Further Details</div>
                            <textarea name="details" className={modalStyles.textarea} />
                        </div>
                    </div>
                    <div className={modalStyles.row}>
                        <button className={modalStyles.button}
                            onClick={() => handleOnSubmit}
                        >
                            Send Request
                        </button>
                    </div>

                </form>
            </Modal>
        </div>
    )
}