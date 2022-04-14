import React from 'react'
import { useRouter } from 'next/router'

const AuthContext = React.createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
        token: ""
    })

    const setUserAuthInfo = ({ data }) => {
        const token = localStorage.setItem("token", data.data)

        setAuthState({
            token: token,
        })
    }

    const isUserAuthenticated = () => {
        if (!authState.token) {
            return false
        }
    }


    return (
        <Provider
            value={{
                authState,
                setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
                isUserAuthenticated,
            }}
        >
            {children}
        </Provider>
    )

}

export { AuthContext, AuthProvider }