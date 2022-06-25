import React, { useEffect, useState } from 'react'
import { useStateValue } from '../redux/StateProvider'
import { useRouter } from 'next/router'
import empStyles from '../styles/Employees.module.css'
import DashNav from '../components/DashNav'
import ErrorMessage from '../components/ErrorMessage'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, firestore } from '../firebase/firebase'
import { collection, doc, setDoc, addDoc, onSnapshot } from 'firebase/firestore'
import bcrypt from 'bcryptjs/dist/bcrypt'

export default function Employees() {

    const [{ userFirstName, isLoggedIn }, dispatch] = useStateValue()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [touched, setTouched] = useState(
        {
            email: false,
            password: false,
            confirmPassword: false
        }
    )
    let formErrors = {
        isEmailError: true,
        isPasswordError: true,
        isConfirmError: true
    }
    const [listUsers, setListUsers] = useState([])


    //VERIFY THE USER IS LOGGED IN:
    useEffect( async() => {
        !isLoggedIn
            ? router.push('/')
            : null

        let users = []
        await onSnapshot(collection(firestore, 'employees'), async (snapshot) => {
            // setListUsers(snapshot.docs.map(doc => doc.data()))
            // console.log(snapshot)

            await snapshot.docs.forEach( async (entry) => {
                await console.log(entry.data())
                await users.push(entry.data())
                // setListUsers([...listUsers, entry.data()])
            })

            console.log('list', users)
            setListUsers(users)
        })

        
    }, [])

    //I HAVE TWO HANDLERS CAUSE I CAN'T SEEM TO PASS THE BOOL WITH IT, ONLY THE NAME.. SO THE BOOL IS THE FUNCTION ITSELF:
    const handleError = (errorName, bool) => {
        // setFormErrors({...formErrors, [errorName]:true})
        formErrors = { ...formErrors, [errorName]: true }
    }

    const handleValid = (errorName, bool) => {
        // setFormErrors({...formErrors, [errorName]:false})
        formErrors = ({ ...formErrors, [errorName]: false })
    }

    const addUser = async (e) => {
        e.preventDefault()

        //Verify frontend data is entered correctly:


        let isValid = true
        Object.values(formErrors).forEach(val => { val === true ? isValid = false : null })

        //Firebase Functions:
        if (isValid && email !== '' && password !== '' && confirmPassword !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    if (userCredential) {

                        const hashedPass = await bcrypt.hash(password, 2)
                        // const collectionRef = doc(db, 'employees')

                        const employeeDoc = doc(firestore, `employees/${email}`)
                        const employeeData = {
                            email: email,
                            name: (email.split('@'))[0],
                            password: hashedPass,
                        }
                        try {
                            await setDoc(employeeDoc, employeeData)
                                .then(result => {
                                    alert('success')
                                })
                        } catch (e) {
                            console.log('ERROR SETDOC ', e)
                        }


                    }
                })
                .catch((error) => {
                    console.log('Error creating user in firestore ', error)
                })

        }
        else {
            alert('Form Has Errors')
        }
    }

    const AddUserForm = () => {
        return (
            <div>
                <form className={empStyles.form} style={{}}>
                    <p style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Add New User</p>
                    <div className={empStyles.formControl}>
                        <div className={empStyles.label}><label>Email: &nbsp;</label></div>
                        <div className={empStyles.inputErrorControl}>
                            <input
                                className={empStyles.input}
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onClick={e => setTouched({ ...touched, email: true })}
                            />
                            <ErrorMessage
                                input={email}
                                checks={{ email: true, minLength: 5 }}
                                show={touched.email}
                                sendError={() => handleError('isEmailError')}
                                sendValid={() => handleValid('isEmailError')}
                                color='yellow'
                                fontSize='small'

                            />
                        </div>
                    </div>
                    <div className={empStyles.formControl}>
                        <div className={empStyles.label}><label>Password: &nbsp;</label></div>
                        <div className={empStyles.inputErrorControl}>
                            <input
                                className={empStyles.input}
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onClick={e => setTouched({ ...touched, password: true })}
                            />
                            <ErrorMessage
                                input={password}
                                checks={{ minLength: 5 }}
                                show={touched.password}
                                sendError={() => handleError('isPasswordError')}
                                sendValid={() => handleValid('isPasswordError')}
                                color='yellow'
                                fontSize='small'

                            />
                        </div>
                    </div>
                    <div className={empStyles.formControl}>
                        <div className={empStyles.label}><label>Confirm Password: &nbsp;</label></div>
                        <div className={empStyles.inputErrorControl}>
                            <input
                                className={empStyles.input}
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onClick={e => setTouched({ ...touched, confirmPassword: true })}
                            />
                            <ErrorMessage
                                input={confirmPassword}
                                checks={{ passwordMatch: password }}
                                show={touched.confirmPassword}
                                sendError={() => handleError('isConfirmError')}
                                sendValid={() => handleValid('isConfirmError')}
                                color='yellow'
                                fontSize='small'

                            />

                        </div>
                    </div>
                    <div className={empStyles.formControl} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className={empStyles.button}
                            onClick={e => addUser(e)}
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    const ListOfUsers = () => {
        return (
            <div>
                {

                    listUsers.map(user => {
                        return (
                            <div 
                                key={Math.random()}
                                style={{display: 'flex', justifyContent: 'space-between'}}
                            >
                                {/* {user} */}
                                <ListItem 
                                    user={user.email}
                                />
                                DELETE
                            </div>
                        )
                    })


                }

            </div>
        )
    }

    const ListItem = ({user}) => {
        return(
            <div style={{border: '1px solid black', padding:'5px', margin: '5px'}}>
                {user}
            </div>
        )
    }

    return (
        <div className={empStyles.body}>
            <DashNav />
            <div className={empStyles.main}>
                {/* <AddUserForm /> */}
                <ListOfUsers />
            </div>
        </div >
    )
}
