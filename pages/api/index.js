import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { ResultStorage } from "firebase-functions/v1/testLab";

//initialize firebase to access its services:
admin.initializeApp(functions.config().firebase)

//initialize express server:
//Why do we have two express servers..?
const app = express()
const main = express()

//add the path to receive requests and apply middleware:
main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))

//initialize the database and collection:
const db = admin.firestore()
const employeesCollection = 'employees'



app.get('/test', async (req, res) => {
    try {
        res.status(200).send('TESTING....')
    }catch(e){
        res.status(404).send('GET ERROR...', e)
    }
})

app.post('/employee', async (req, res) => {
    try {
        const employee: Employee = {
            email: req.body['email'],
            username: req.body['username'],
            firstname: req.body['firstname'],
            lastname: req.body['lastname'],
            password: req.body['password'],
        }

        const newDoc = await db.collection(`employees/${employee.email}`).add(employee)
        res.status(201).send(`Created a new user: ${newDoc} `)
    } catch (e) {
        res.status(400).send(`Error...${e}`)
    }
})



// app.listen(3005, ())

//define google could function name...??!!:
export const webApi = functions.https.onRequest(main)
