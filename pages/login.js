import React, { useState } from 'react'
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/clientApp';
import bcrypt from 'bcryptjs';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useStateValue } from '../redux/StateProvider'
import * as actionTypes from '../redux/actionTypes' 


export default function Login() {
    const [{userFirstName}, dispatch] = useStateValue()
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [savedHash, setSavedHash] = useState('')
    const [toCompare, setToCompare] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPass, setSignUpPass] = useState('')
    const [logInEmail, setLogInEmail] = useState('')
    const [logInPass, setLogInPass] = useState('')
    const [hashedPassed, setHashedPass] = useState('')


    const Add = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, signUpEmail, signUpPass)
            .then(async (userCredential) => {
                if (userCredential) {

                    const myHashed = await bcrypt.hash(signUpPass, 2)
                    setHashedPass(myHashed)
                    AddToDatabase()

                }
            })
            .catch((error) => {
                console.log('FRONT ERROR ', error)
            })
    }


    const AddToDatabase = async () => {
        const timestamp = Date.now().toString()
        const employees = doc(firestore, `employees/${signUpEmail}}`)
        const employeeData = {
            email: signUpEmail,
            name: (signUpEmail.split('@'))[0],
            password: hashedPassed
        }
        try {
            await setDoc(employees, employeeData)
            alert('Yes')
        } catch (error) {
            console.log('BACK ERROR', error)
        }


    }

    const Compare = async (e) => {
        e.preventDefault()
        // setToCompare(bcrypt.hashSync(pass, bcrypt.genSaltSync()))
        // bcrypt.compare(bcrypt.hashSync(toCompare, bcrypt.genSaltSync()), savedHash, (error, response) => {
        // const anotherCheck = await bcrypt.hash(toCompare, 2)
        bcrypt.compare(toCompare, savedHash, (error, response) => {

            if (response) {
                alert('MATCH ' + savedHash)
            } else {
                alert('NO MATCH')
                console.log('NO MATCH ERROR ', anotherCheck, toCompare, savedHash)
            }
        })


    }

    const Check = async (e) => {
        const employeesCollection = collection(firestore, 'employees')

        // const employee = doc(firestore, `employees/${logInEmail}}`)
        // console.log('CHECKING..', employee.email)

        try {
            //FIND THE USER
            const findUserQuery = query(employeesCollection, where('email', '==', logInEmail), limit(1))
            const querySnapshot = await getDocs(findUserQuery)
            const result = []

            querySnapshot.forEach(snapshot => {
                result.push(snapshot)
            })

            
            console.log(result[0].data())

           await bcrypt.compare(logInPass, result[0].data().password, (error, response) => {

                if (response) {
                    alert('MATCH ')
                    dispatch({
                        type: actionTypes.LOGIN,
                        payload: result[0].data().name
                    })
                } else {
                    alert('NO MATCH')
                    // console.log('NO MATCH ERROR ', anotherCheck, toCompare, savedHash)
                }
            })
        } catch {
            alert('NONE')
        }


    }



    return (
        <div>
            {userFirstName}
            <form>
                <p>Sign-Up</p>
                <input
                    value={signUpEmail}
                    type="text"
                    onChange={e => setSignUpEmail(e.target.value)}
                />
                <br />
                <input
                    value={signUpPass}
                    type="pass"
                    onChange={e => setSignUpPass(e.target.value)}
                />
                <br />
                <button
                    onClick={e => Add(e)}
                >
                    Add

                </button>
            </form>


            <br /><br />
            <p>Log In</p>
            <input
                value={logInEmail}
                type="text"
                onChange={e => setLogInEmail(e.target.value)}
            />
            <br />
            <input
                type='text'
                value={logInPass}
                onChange={e => setLogInPass(e.target.value)}
            />
            <br />
            <button
                // onClick={e => Compare(e)}
                onClick={e => Check(e)}
            >
                Check
            </button>
        </div>
    )
}
