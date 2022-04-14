import { createStore } from 'redux'

const initState = {
    employee: false,
    userFirstName: 'Testing...'
}

const mainReducer = (state = initState, action) => {
    switch(action.type){
        
    }
}

const store = createStore(mainReducer)