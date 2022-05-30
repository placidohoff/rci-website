import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useStateValue } from '../redux/StateProvider'
import dashStyles from '../styles/Dashboard.module.css'
import DashNav from '../components/DashNav'

export default function Dashboard() {
    const [{ userFirstName, isLoggedIn }, dispatch] = useStateValue()
    const router = useRouter()
    // const authContext = React.useContext(AuthContext)

    //VERIFY THE USER IS LOGGED IN:
    useEffect(() => {
        isLoggedIn
            ? router.push('/dashboard')
            : router.push('/')
        console.log('CHECK ', userFirstName)
    }, [])

    return (

        <React.Fragment>
            {isLoggedIn &&
                <div className={dashStyles.body}>
                    <Head>
                        <title>RCI Dashboard</title>
                    </Head>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        <DashNav />
                        <h1>
                            DASHBOARD
                        </h1>
                    </div>
                </div>
            }
        </React.Fragment>

    )
}