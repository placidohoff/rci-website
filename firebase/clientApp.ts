import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import dotenv from 'dotenv'


const firebaseConfig = {
    apiKey: `AIzaSyBsVOgdEI3lQQ4a-NogHFKN8UICA4yBucc`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
    measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`
}
const firestoreSettings = {
    useFetchStreams: false, /* this might not be doing anything*/
    // experimentalAutoDetectLongPolling: true, /* This line fixed my issue*/
    experimentalForceLongPolling: true
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// const firestore = getFirestore()
const firestore = initializeFirestore(app, firestoreSettings)
firestore.app.options
const auth = getAuth(app)

export { firestore, auth }