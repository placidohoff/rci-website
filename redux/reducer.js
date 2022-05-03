import * as actionTypes from './actionTypes'
import jwt from 'jsonwebtoken'

let data = ''


if (typeof window !== 'undefined') {
    data = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME)
}

let username = ''
let isLoggedIn = false

jwt.verify(data, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (decoded) {
        username = decoded.name
        isLoggedIn = decoded.isLoggedIn
        console.log(decoded)
    } else {
        if (typeof window !== 'undefined') {
            localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME, null)
        }

    }
})

export const initialState = {
    userFirstName: username,
    isLoggedIn: isLoggedIn
}

//JWT VERIFY THE LOCALSTORAGE DATA. IF SO, REASSIGN THE INITIAL STATE
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                userFirstName: action.payload,
                isLoggedIn: true
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                userFirstName: '',
                isLoggedIn: false
            }
    }
}

export default reducer