import { useRouter } from 'next/router'
import { react, useState } from 'react'
import Modal from 'react-modal'
import { useStateValue } from '../redux/StateProvider'
import loginStyles from '../styles/Login.module.css'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import * as actionTypes from '../redux/actionTypes'
import { firestore } from '../firebase/clientApp'
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import bcrypt from 'bcryptjs/dist/bcrypt'

const Login = ({ isOpen, closeModalFn }) => {
    const [{ isLoggedIn }, dispatch] = useStateValue()
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secretKey, setSecretKey] = useState(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
    // const [employees, employeesLoading, employeesError] = useCollection(
    //     firestore().collection('employees'), {}
    // )

    // if(!employeesLoading && employees){
    //     employees.docs.map((employee) => console.log(employee.data()))
    // }//TEST

    const router = useRouter()

    const styles = {
        content: {
            // top: '5%',
            // left: '75%',
            // right: 'auto',
            // bottom: 'auto',
            // top: '50%',
            left: 'auto',
            // right: 'auto',
            bottom: 'auto',
            // marginRight: '-50%',
            transform: 'translateY(-50%, -50%)',
            padding: '30px',
            borderRadius: '30px',
            border: '5px solid yellow',
            // backgroundColor: '#FFEB01',
            backgroundColor: '#C4C4C4',
            fontWeight: 'bold',
            height: '200',
            width: '200'
            // color: 'blue'
        },
    }

    const login = (e) => {
        e.preventDefault()
        closeModalFn()
        alert('hello')
    }

    const signIn = async (e) => {
        e.preventDefault()
        try {
            // console.log(process.env.NEXT_PUBLIC_URL)
            await axios.get(process.env.NEXT_PUBLIC_URL + '/api/employee',
                {
                    params:
                    {
                        email: userEmail,
                        password: password
                    }
                })
                .then((response) => {
                    const token = jwt.sign(
                        {
                            name: response.data.name,
                            isLoggedIn: true

                        },
                        secretKey,
                        {
                            expiresIn: 100
                        }
                    )

                    localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME, token)
                    // console.log(token)
                    dispatch({
                        type: actionTypes.LOGIN,
                        payload: response.data.name
                    })
                    
                })
                .finally(
                    closeModalFn()

                )
            router.push('/dashboard')
        } catch (e) {
            alert('Error Logging In')
            console.error(e)
        }
    }

    const Check = async (e) => {
        e.preventDefault()
        const employeesCollection = collection(firestore, 'employees')
        try {
            //FIND THE USER
            const findUserQuery = await query(employeesCollection, where('email', '==', userEmail), limit(1))
            const querySnapshot = await getDocs(findUserQuery)
            const result = []

            querySnapshot.forEach(snapshot => {
                result.push(snapshot)
            })

            await bcrypt.compare(password, result[0].data().password, (error, response) => {
                if (response) {
                    const token = jwt.sign(
                        {
                            name: result[0].data().name,
                            isLoggedIn: true

                        },
                        secretKey,
                        {
                            expiresIn: 100
                        }
                    )

                    localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME, token)
                    dispatch({
                        type: actionTypes.LOGIN,
                        payload: result[0].data().name
                    })
                    router.push('/dashboard')
                    closeModalFn()
                } else {
                    alert('Error with log in attempt. Please try again.')
                    // console.log('NO MATCH ERROR ', anotherCheck, toCompare, savedHash)
                }
            })
        } catch {
            alert('Error with log-in attempt. Please try again.')
        }


    }



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModalFn}
            contentLabel='Employee Login'
            style={styles}
        // className={styles.modal}
        >

            <div className={loginStyles.main}>
                <div className={loginStyles.header}>
                    <p>Employee Log-In</p>
                    <p
                        className={loginStyles.close}
                        onClick={e => closeModalFn()}
                    >X</p>
                </div>
                <form>
                    <div className={loginStyles.loginRow}>
                        <span>UserEmail:</span>
                        <input
                            type="text"
                            value={userEmail}
                            onChange={e => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className={loginStyles.loginRow}>
                        <span>Password:</span>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={loginStyles.bnContain}>
                        <button
                            className={loginStyles.submit}
                            onClick={e => Check(e)}
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default Login