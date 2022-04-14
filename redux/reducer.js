import * as actionTypes from './actionTypes'

export const initialState= {
    userFirstName: 'Testing..'
}
 
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN:
            return{
                ...state,
                userFirstName: action.payload
            }
    }
}

export default reducer