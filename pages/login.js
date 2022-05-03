// import React, { useState } from 'react'
// import { auth, db } from '../firebase/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc } from '@firebase/firestore';
// import { setDoc } from 'firebase/firestore';
// import { firestore } from '../firebase/clientApp';
// import bcrypt from 'bcryptjs';
// import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
// import { useStateValue } from '../redux/StateProvider'
// import * as actionTypes from '../redux/actionTypes'
// import axios from 'axios'
// import jwt from 'jsonwebtoken'




// export default function Login() {
//     const [{ userFirstName }, dispatch] = useStateValue()
//     const [name, setName] = useState('')
//     const [pass, setPass] = useState('')
//     const [savedHash, setSavedHash] = useState('')
//     const [toCompare, setToCompare] = useState('')
//     const [signUpEmail, setSignUpEmail] = useState('')
//     const [signUpPass, setSignUpPass] = useState('')
//     const [logInEmail, setLogInEmail] = useState('')
//     const [logInPass, setLogInPass] = useState('')
//     const [hashedPassed, setHashedPass] = useState('')
//     const [secretKey, setSecretKey] = useState(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)


//     const Add = async (e) => {
//         e.preventDefault();
//         createUserWithEmailAndPassword(auth, signUpEmail, signUpPass)
//             .then(async (userCredential) => {
//                 if (userCredential) {

//                     const myHashed = await bcrypt.hash(signUpPass, 2)
//                     setHashedPass(myHashed)
//                     AddToDatabase()

//                 }
//             })
//             .catch((error) => {
//                 console.log('FRONT ERROR ', error)
//             })
//     }


//     const AddToDatabase = async (e) => {
//         e.preventDefault()

//         //TODO: FRONT END REGEX CHECK FOR EMAIL BEFORE ENTER THE TRY/CATCH BLOCK

//         try {
//             axios.post('/api/employee',
//                 {
//                     email: signUpEmail,
//                     password: signUpPass
//                 })
//                 .then((response) => {
//                     console.log(response)
//                     alert('Created new user succesfully.')
//                     setSignUpEmail('')
//                     setSignUpPass('')
//                 })
//         }

//         catch (err) {
//             console.log('Error Front ', err)
//             alert('Error with creating new user.\nPerhaps this email is already in use')
//         }

//     }

//     const Compare = async (e) => {
//         e.preventDefault()
//         // setToCompare(bcrypt.hashSync(pass, bcrypt.genSaltSync()))
//         // bcrypt.compare(bcrypt.hashSync(toCompare, bcrypt.genSaltSync()), savedHash, (error, response) => {
//         // const anotherCheck = await bcrypt.hash(toCompare, 2)
//         bcrypt.compare(toCompare, savedHash, (error, response) => {

//             if (response) {
//                 alert('MATCH ' + savedHash)
//             } else {
//                 alert('NO MATCH')
//                 console.log('NO MATCH ERROR ', anotherCheck, toCompare, savedHash)
//             }
//         })


//     }

//     const SignIn = async (e) => {
//         e.preventDefault()
//         axios.get('/api/employee',
//             {
//                 params:
//                 {
//                     email: logInEmail,
//                     password: logInPass
//                 }
//             })
//             .then((response) => {
//                 // console.log('FRONT END RES =>', response.data)
//                 // const token = jwt.sign({ data: response.data }, secretKey, { expiresIn: 300000 })
                
//                 const token = jwt.sign(
//                     {
//                         name: response.data.name,
//                         isLoggedIn: true

//                     },
//                     secretKey,
//                     {
//                         expiresIn: 100
//                     }
//                 )

//                 localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME, token)
//                 // console.log(token)
//                 dispatch({
//                     type: actionTypes.LOGIN,
//                     payload: response.data.name
//                 })
//             })
//     }

//     //TODO: SEND TO BACKEND, RETRIEVE JWT SAVE AS LOCALSTORAGE
//     const Check = async (e) => {
//         const employeesCollection = collection(firestore, 'employees')

//         // const employee = doc(firestore, `employees/${logInEmail}}`)
//         // console.log('CHECKING..', employee.email)

//         try {
//             //FIND THE USER
//             const findUserQuery = query(employeesCollection, where('email', '==', logInEmail), limit(1))
//             const querySnapshot = await getDocs(findUserQuery)
//             const result = []

//             querySnapshot.forEach(snapshot => {
//                 result.push(snapshot)
//             })


//             console.log(result[0].data())

//             await bcrypt.compare(logInPass, result[0].data().password, (error, response) => {

//                 if (response) {
//                     alert('MATCH ')
//                     generateAccessToken(result[0].data())
//                     dispatch({
//                         type: actionTypes.LOGIN,
//                         payload: result[0].data().name
//                     })
//                 } else {
//                     alert('NO MATCH')
//                     // console.log('NO MATCH ERROR ', anotherCheck, toCompare, savedHash)
//                 }
//             })
//         } catch {
//             alert('NONE')
//         }


//     }

//     const generateAccessToken = (user) => {

//     }



//     return (
//         <div>
//             {userFirstName}
//             <form>
//                 <p>Sign-Up</p>
//                 <input
//                     value={signUpEmail}
//                     type="text"
//                     onChange={e => setSignUpEmail(e.target.value)}
//                 />
//                 <br />
//                 <input
//                     value={signUpPass}
//                     type="pass"
//                     onChange={e => setSignUpPass(e.target.value)}
//                 />
//                 <br />
//                 <button
//                     onClick={e => AddToDatabase(e)}
//                 >
//                     Add

//                 </button>
//             </form>


//             <br /><br />
//             <p>Log In</p>
//             <input
//                 value={logInEmail}
//                 type="text"
//                 onChange={e => setLogInEmail(e.target.value)}
//             />
//             <br />
//             <input
//                 type='text'
//                 value={logInPass}
//                 onChange={e => setLogInPass(e.target.value)}
//             />
//             <br />
//             <button
//                 // onClick={e => Compare(e)}
//                 onClick={e => SignIn(e)}
//             >
//                 Check
//             </button>
//         </div>
//     )
// }
