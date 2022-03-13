import { useState } from "react"

export default function ErrorMessage({ input, checks, show, sendError, sendValid, name }) {

    // const [isValid, setIsValid] = useState(false)

    //TODO: SEE IF DATA CAN B SNT TO PARENT ONBLUR
    let isValid = false

    if (show) {
        if (input.length === 0) {
 
            return (
                <div>
                    Cannot be empty
                </div>
            )
        }
        if (checks.noSpaces && input.includes(' ')) {
            return (
                <div>Must not contain spaces</div>
            )
        }
        if (checks.dataType === 'string' && /\d/.test(input)) {
            // setIsValid(false)
            isValid = false
            return (
                <div>
                    Must not contain numbers
                </div>
            )
        }
        if (input.length < checks.minLength) {
            return (
                <div>Too short</div>
            )
        }
        else {
            // sendValid(name)
            // setIsValid(true)
            isValid = true
            return (
                <div />
            )
        }

    }
    else {
        return null
    }

}
