import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { auth, firestore } from '../../firebase/firebase'
import * as  doc from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import NextCors from 'nextjs-cors'

require('dotenv').config()
const cors = require('cors')

//DESCRIPTION: THIS IS THE API ENDPOINT FOR THE ADDING AND LOGIN OF EMPLOYEES. CURRENTLY NOT BEING USED HOWEVER, DECIDED TO DO THIS FUNCTIONALITY IN THE FRONTEND


// import { ResultStorage } from "firebase-functions/v1/testLab";

//initialize firebase to access its services:
// admin.initializeApp(functions.config().firebase)
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// }

// admin.initializeApp(firebaseConfig)

//initialize express server:
//Why do we have two express servers..?
// const app = express()
// const main = express()

//add the path to receive requests and apply middleware:
// main.use('/api/v1', app)
// main.use(bodyParser.json())
// main.use(bodyParser.urlencoded({ extended: false }))

//initialize the database and collection:
// const db = admin.firestore()
// const employeesCollection = 'employees'


interface Employee {
    email: String,
    username: String,
    firstname: String,
    lastname: String,
    password: String,
}

const employeesCollection = collection(firestore, 'employees')

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { email, password } = req.body

            const findUserQuery = query(employeesCollection, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(findUserQuery)
            //CAN ONLY ADD NEW USER IF ONE WITH THIS EMAIL DOES NOT EXIST:
            if (querySnapshot.size === 0) {
                const employeeDoc = doc.doc(firestore, `employees/${email}`)
                const hashedPass = await bcrypt.hash(password, 2)
                const employeeData = {
                    email: email,
                    name: (email.split('@'))[0],
                    password: hashedPass,
                }

                try {
                    setDoc(employeeDoc, employeeData)
                        .then(result => {
                            res.status(200).send('Success ', result)
                        })

                } catch (error) {
                    console.log('BACK ERROR', error)
                }
            } else {
                res.status(404).send('Already Exist')
            }
        }

        else if (req.method === 'GET') {
            await NextCors(req, res, {
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
                origin: '*',
                optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204

            })
            const { email, password } = req.query

            try {

                const findUserQuery = query(employeesCollection, where('email', '==', email), limit(1))
                const querySnapshot = await getDocs(findUserQuery)
                if (querySnapshot.size === 1) {
                    const document = []
                    querySnapshot.forEach(snapshot => {
                        document.push(snapshot)
                    })

                    await bcrypt.compare(password, document[0].data().password)
                        .then((response) => {
                            if (response) {
                                const data = {
                                    email: document[0].data().email,
                                    name: document[0].data().name
                                }
                                res.status(200).send(data)
                            } else {
                                res.status(404).send('ERROR MATCHING')
                            }
                        })



                } else {
                    res.status(404).send('Error logging in')
                }




            } catch (e) {
                res.status(404).send('ERROR')
            }
        }

    } catch (e) {
        res.send('ERROR!')
    }


}



// app.post('/employee', async (req, res) => {
//     try {
//         const employee: Employee = {
//             email: req.body['email'],
//             username: req.body['username'],
//             firstname: req.body['firstname'],
//             lastname: req.body['lastname'],
//             password: req.body['password'],
//         }

//         const newDoc = await db.collection(`employees/${employee.email}`).add(employee)
//         res.status(201).send(`Created a new user: ${newDoc} `)
//     } catch (e) {
//         res.status(400).send(`Error...${e}`)
//     }
// })



// app.listen(3005, ())

//define google could function name...??!!:

// export const webApi = functions.https.onRequest(main)
