import { useRouter, useContext } from 'next/router'
import React, { useEffect } from 'react'
import { AuthContext } from '../src/context/auth-context'
import Head from 'next/head'

export default function Dashboard() {
    const router = useRouter()
    // const authContext = React.useContext(AuthContext)
    const authContext = AuthContext

    useEffect(() => {
        authContext.isUserAuthenticated
        ? router.push('/dashboard')
        : router.push('/')
        console.log('CHECK ', authContext)
    },[])

    return(
        <React.Fragment>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div>
                <h1>DASHBOARD</h1>
            </div>
        </React.Fragment>
    )
}