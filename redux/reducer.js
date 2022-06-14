import * as actionTypes from './actionTypes'
import jwt from 'jsonwebtoken'

let data = ''


if (typeof window !== 'undefined') {
    data = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME)
}

let username = ''
let isLoggedIn = false
let email = null
let loadedJobSite = {}

jwt.verify(data, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (decoded) {
        username = decoded.name
        isLoggedIn = decoded.isLoggedIn
        email = decoded.email
        loadedJobSite = {}
        console.log(decoded)
    } else {
        if (typeof window !== 'undefined') {
            localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME, null)
        }

    }
})

export const initialState = {
    userFirstName: username,
    isLoggedIn: isLoggedIn,
    email: email,
    loadedJobSite: {}
}

//JWT VERIFY THE LOCALSTORAGE DATA. IF SO, REASSIGN THE INITIAL STATE
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                userFirstName: action.payload.name,
                isLoggedIn: true,
                email: action.payload.email
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                userFirstName: '',
                isLoggedIn: false,
                email: null
            }
        case actionTypes.LOADJOB:
            return{
                ...state,
                loadedJobSite: action.payload.job
            }
    }
}

export default reducer