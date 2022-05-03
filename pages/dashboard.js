import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useStateValue } from '../redux/StateProvider'
import dashStyles from '../styles/Dashboard.module.css'

export default function Dashboard() {
    const [{ userFirstName, isLoggedIn }, dispatch] = useStateValue()
    const router = useRouter()
    // const authContext = React.useContext(AuthContext)

    //TODO: MAKE A BOOL "ISLOGGEDIN" IN THE STATEVALUE. 
    useEffect(() => {
        isLoggedIn
            ? router.push('/dashboard')
            : router.push('/')
        console.log('CHECK ', userFirstName)
    }, [])

    return (

        <React.Fragment className={dashStyles.body}>
            {isLoggedIn &&
                <div className={dashStyles.body}>
                    <Head>
                        <title>RCI Dashboard</title>
                    </Head>
                    <div>
                        <h1 style={{paddingTop: '20px'}}>DASHBOARD</h1>
                    </div>
                </div>
            }
        </React.Fragment>

    )
}