import { useState } from 'react'
import Modal from 'react-modal'
import modalStyles from '../styles/Modal.module.css'
import Select from 'react-select'

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

const ErrorMessage = ({ input, checks, show, messages }) => {
    // <ErrorMessage
    //     input={firstName}
    //     checks={{ 'minLength': 3, 'maxLength': 20, 'dataType': 'strings' }}
    //     show={touched.firstName}
    //     messages={['']}
    // />
}



export default function RequestModal({ isOpen, closeModalFn, options, val }) {

    const [errMessages, setErrMessages] = useState([false, false, false, false, false, false, false, false, false, false])
    const [values, setValues] = useState([new Date(), { value: '', isErr: false, errMess: [], meta: 'First Name' }, '', '', '', '', '', '', '', ''])
    const [touched, setTouched] = useState(
        {
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
     const [firstName, setFirstName] = useState('')
     const [lastName, setLastName] = useState('')
     const [email, setEmail] = useState('')
     const [phone, setPhone] = useState('')
     const [address, setAddress] = useState('')
     const [city, setCity] = useState('')
    //TODO: SEND THESE VALUES AS PROPS TO THE ERRORMESSAGE COMPONENT,
        //WITHIN THE COMPONENT, CHECK WHICH VALUE IS PASSED, AND RUN THE APPROPRIATE CHECKS
        //IN THE COMPONENT, IF FAILS CHECK, DISPATCH SET ERROR TO CHANGE STATE OF ERROR
        //IF STATE ERROR IS TRUE, CANNOT SEND INFO TO THE BACKEND

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        // console.log('TESSSSST', e.currentTarget.elements)
        // alert('test')
        const formData = {}
        let isFormValid = true
        Array.from(e.currentTarget.elements).forEach(field => {
            if (!field.name) return
            if (field.value.trim() === '') {
                // console.log('empty')
                if (field.name)
                    isFormValid = false
            } else {

            }
            formData[field.name] = field.value
        })

        if (isFormValid) {
            console.log('valid')
        }

        // await fetch('/api/request', {
        //     method: 'POST',
        //     body: JSON.stringify(formData)
        // })
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

                            <Select
                                defaultValue={options[val]}
                                className='basic-multi-select'
                                options={options}
                                isMulti
                                name='service'
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button className={modalStyles.close} onClick={closeModalFn}>Exit</button>
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px', justifyContent: 'flex-start' }} className={modalStyles.row}>
                        <div style={{ marginRight: '15px' }}>Requested Start-Date:</div>
                        <input name='date' className={modalStyles.smallIn} type='date' />
                        <ErrorMessage
                            input={firstName}
                            checks={{ 'minLength': 3, 'maxLength': 20, 'dataType': 'strings' }}
                            show={touched.firstName}
                            messages={['']}
                        />
                    </div>


                    <div className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>First Name</div>
                            <input type='text' onClick={() => setTouched()} name="firstname" className={modalStyles.smallIn} />
                            {
                                <ErrorMessage
                                    input={firstName}
                                    checks={{ 'minLength': 3, 'maxLength': 20, 'dataType': 'strings' }}
                                    show={touched.firstName}
                                    messages={['']}
                                />
                            }
                            {
                                errMessages[1] === true && <p className={modalStyles.error}>Cannot be empty</p>
                            }
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>Last Name</div>
                            <input type='text' name="lastname" className={modalStyles.smallIn} />
                            {
                                errMessages[2] === true && <p className={modalStyles.error}>Cannot be empty</p>
                            }
                        </div>
                    </div>
                    <div className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>Email</div>
                            <input type='text' name="email" className={modalStyles.smallIn} />
                            {
                                errMessages[1] === true && <p className={modalStyles.error}>Cannot be empty</p>
                            }
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>Phone Number</div>
                            <input type='text' name="phonenumber" className={modalStyles.smallIn} />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }} className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>Service Address</div>
                            <input type='text' name="address" className={modalStyles.longIn} />
                        </div>
                    </div>
                    <div className={modalStyles.row}>
                        <div className={modalStyles.inputControl}>
                            <div>City</div>
                            <input type='text' name="city" className={modalStyles.smallIn} />
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>State</div>
                            <input type='text' name="state" className={modalStyles.smallerIn} />
                        </div>
                        <div className={modalStyles.inputControl}>
                            <div>Zip</div>
                            <input type='text' name="zip" className={modalStyles.smallerIn} />
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