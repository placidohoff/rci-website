import { send } from "emailjs-com"
import { useState } from "react"
import styles from '../styles/ErrorMessage.module.css'
import { BsFillExclamationCircleFill } from "react-icons/bs"

export default function ErrorMessage({ input, checks, show, sendError, sendValid, color = 'blue', fontSize = 'small' }) {

    // const [isValid, setIsValid] = useState(false)

    //TODO: SEE IF DATA CAN B SNT TO PARENT ONBLUR
    let isValid = true



    if (show && input) {
        if (checks.empty && input.trim().length === 0 || checks.empty && input.length===0) {
            isValid = false
            return (
                <div style={{color:color, fontWeight:'bold'}}>Cannot be Empty</div>
            )
        }
        if (input.length === 0) {
            isValid = false

            return (
                <div className={styles.error}>
                    Cannot be empty
                </div>
            )
        }
        if (checks.noSpaces && input.includes(' ')) {
            isValid = false
            return (
                <div className={styles.error}>Must not contain spaces</div>
            )
        }
        if (checks.dataType === 'date' && new Date(input) < new Date()) {
            isValid = false
            sendError()
            return (
                <div className={styles.error}>
                    Date has already passed
                </div>
            )
        }
        if (checks.dataType === 'date' && input == new Date()) {
            isValid = false
            sendError()
            return (
                <div className={styles.error}>
                    Must Select a Date
                </div>
            )
        }
        if (checks.dataType === 'string' && /\d/.test(input)) {
            isValid = false
            sendError()
            return (
                <div className={styles.error}>
                    Must not contain numbers
                </div>
            )
        }
        if (input.length < checks.minLength) {
            isValid = false
            return (
                <div style={{color:color, fontWeight:'bold', fontSize: fontSize, marginBottom: '10px'}}><BsFillExclamationCircleFill /> Must be at least {checks.minLength} characters</div>
            )
        }
        if (checks.email && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) && input.trim() !== '') {
            isValid = false
            return (
                // <div className={styles.error}>
                <div style={{color:color, fontWeight:'bold', fontSize: fontSize, marginBottom: '10px'}}>
                   <BsFillExclamationCircleFill /> Email format is incorrect
                </div>
            )
        }
        if (checks.phoneNumber && !(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(input))) {
            isValid = false
            return (
                <div className={styles.error}>
                    Invalid Phone Number
                </div>
            )
        }
        if (checks.address && !(/^\d+\s[A-z]+\s[A-z]+/.test(input))) {
            isValid = false
            return (
                <div className={styles.error}>
                    Address Format Error
                </div>
            )
        }
        if (checks.zipCode && !(/^\d{5}$|^\d{5}-\d{4}$/.test(input))) {
            isValid = false
            return (
                <div className={styles.error}>
                    Zip Code Error
                </div>
            )
        }
        if (checks.fullName && !(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(input.trim())) && input.trim() !== '') {
            isValid = false
            return (
                <div style={{ color: 'yellow', fontWeight: 'bold' }}>Format Error: (No special characters or numbers)</div>
            )
        }
        if(checks.passwordMatch && input !== checks.passwordMatch ){
            isValid = false
            return(
                <div style={{color:color, fontWeight:'bold', fontSize: fontSize, marginBottom: '10px'}}>
                   <BsFillExclamationCircleFill /> Passwords do not match
                </div>
            )
        }


    }
    if (checks.dataType === 'services') {
        if (input.length === 0) {
            isValid = false
            return (
                <div className={styles.error}>
                    Must select a service
                </div>
            )
        } else {
            return (
                <div />
            )
        }
    }

    else {
        if(isValid)
            sendValid()
        // setIsValid(true)
        // isValid = true
        return (
            <div />
        )
    }


}
