import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../redux/StateProvider'
import styles from '../styles/JobSites.module.css'
import DashNav from '../components/DashNav'
import AddJobSite from '../components/AddJobSite'
import { collection, doc, setDoc, addDoc, onSnapshot } from 'firebase/firestore'
import { auth, db, firestore } from '../firebase/firebase'
import * as actionTypes from '../redux/actionTypes'

export default function Jobsites() {
    const [{ userFirstName, isLoggedIn }, dispatch] = useStateValue()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [jobsList, setJobsList] = useState([])

    useEffect(async () => {
        if (!isLoggedIn) router.push('/')

        let jobSites = []
        await onSnapshot(collection(firestore, 'jobsites'), async (snapshot) => {
            // setListUsers(snapshot.docs.map(doc => doc.data()))
            // console.log(snapshot)

            await snapshot.docs.forEach(async (entry) => {
                // await console.log(entry.data())
                await jobSites.push(entry.data())
                // setListUsers([...listUsers, entry.data()])
            })

            console.log('list', jobSites)
            setJobsList(jobSites)

            //TODO: Sort by Date Created Descending
        })
    }, [])


    const ListJobs = () => {
        return (
            <div>
                {
                    jobsList.map(site => {
                        return (
                                
                                    <JobItem
                                        site={site}
                                        key={Math.random()}
                                    />
                                
                        )
                    })
                }
            </div>
        )
    }

    const JobItem = ({ site }) => {
        return (
            <div
                className={styles.jobItem}
                onClick={e => {
                    dispatch({
                        type: actionTypes.LOADJOB,
                        payload: {
                            job: site
                        }
                    })
                    router.push('/details')
                }
                    
                }
            >
                <div style={{ display: 'flex' }}>
                    <p style={{ marginRight: '5px' }}>Job Number:</p> <p>{site.orderNumber}</p>
                </div>
                <div><p>{site.address}, {site.city}, {site.state}, {site.zip}</p></div>
            </div>
        )
    }

    return (
        <div style={{ height: '100vh' }}>
            <div className={styles.body}>
                <DashNav />
                <div className={styles.main}>
                    <button
                        className={styles.button}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add New Job-Site
                    </button>
                    <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <AddJobSite
                                isOpen={isModalOpen}
                                closeModalFn={() => setIsModalOpen(false)}
                            />

                        </div>

                    </div>

                </div>
                <br />

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ListJobs 
                    key={Math.random()}
                />
            </div>
        </div>
    )
}
