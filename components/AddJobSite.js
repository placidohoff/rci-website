import React, { useState, useEffect } from 'react'
import Modal from 'react-modal/lib/components/Modal'
import stylesheet from '../styles/AddJobModal.module.css'
import { useStateValue } from '../redux/StateProvider'
import { collection, doc, setDoc, addDoc, onSnapshot } from 'firebase/firestore'
import { auth, db, firestore } from '../firebase/firebase'
import * as actionTypes from '../redux/actionTypes'
import { useRouter } from 'next/router'

export default function AddJobSite({ isOpen, closeModalFn }) {
    const [{ userFirstName, isLoggedIn, email }, dispatch] = useStateValue()
    const router = useRouter()
    const styles = {
        content: {

            // top: '20%',
            // left: '30%',
            left: '15vw',
            // right: '50%',
            // bottom: '50%',

            transform: 'translateY(-50%, -50%)',
            padding: '30px',
            borderRadius: '30px',
            border: '5px solid yellow',
            // backgroundColor: '#FFEB01',
            backgroundColor: '#C4C4C4',
            fontWeight: 'bold',
            height: '450px',
            width: '80vw',
            maxWidth: '600px',
            // display: 'flex',
            // justifySelf: 'center'
            // color: 'blue'
        },
    }
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [orderTakenBy, setOrderTakenBy] = useState(email)
    const [workType, setWorkType] = useState('daywork')
    const [orderNumber, setOrderNumber] = useState((Math.random() * 1000).toFixed(0))

    const createJob = async (e) => {
        e.preventDefault()
        // if(address==='')
        // const hashedPass = await bcrypt.hash(password, 2)
        // const collectionRef = doc(db, 'employees')

        const jobSitesDoc = doc(firestore, `jobsites/${orderNumber}`)
        // let materialsList = populateEmptyMaterials()
        // let otherCharges = populateEmptyChargesList()
        // let laborList = populateEmptyLaborList()
        const jobSiteData = {
            orderNumber: orderNumber,
            address: address,
            city: city,
            state: state,
            zip: zip,
            orderTakenBy: email,
            workType: workType,
            ownerName: '',
            ownerPhone: '',
            ownerAddress: '',
            ownerCity: '',
            ownerState: '',
            ownerZip:'',
            materialsList: [],
            otherChargesList: [],
            laborList: [],
            description: '',
            totalLabor: 0,
            totalMaterials: 0,
            totalOther: 0,
            totalTax: 0,
            jobTotal: 0,
            signature: '',
            dateCreated: Date.now() 
        }
        try {
            await setDoc(jobSitesDoc, jobSiteData)
                .then(result => {
                    alert('success')

                    //OPEN THE NEWLY CREATED JOB SITE:
                    dispatch({
                        type: actionTypes.LOADJOB,
                        payload: {
                            job: jobSiteData
                        }
                    })
                    router.push('/details')
                })
        } catch (e) {
            console.log('ERROR SETDOC ', e)
        }
    }

    function populateEmptyMaterials()  {
        let materialsArr = new Array(21)
        for(let i = 0; i < materialsArr.length; i++){
            let emptyMat = {
                material: '',
                qty: 0,
                price: 0,
                amount: 0
            }
            materialsArr.push(emptyMat)
        }

        return materialsArr
    }

    function populateEmptyChargesList(){
        return []
    }

    function populateEmptyLaborList(){
        return []
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModalFn}
                contentLabel='Employee Login'
                style={styles}
                className={stylesheet.contents}
            >
                <h4 style={{ display: 'flex', justifyContent: 'center', marginTop: '-5px', marginBottom: '35px' }}>Add New Job-Site</h4>
                <form style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
                    <div className={stylesheet.rowControl}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className={stylesheet.labelControl}>Order No:</div>
                        <div style={{ width: '75%', display: 'flex', justifyContent: 'flex-start' }}>{orderNumber}</div>
                    </div><br />
                    <div className={stylesheet.rowControl}>
                        <div className={stylesheet.labelControl} >Address:</div>
                        <div className={stylesheet.inputControl}>
                            <input
                                className={stylesheet.input}
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} className={stylesheet.rowControl}>

                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }} className={stylesheet.cityStateZipLabel}>City:</div>
                        <div style={{ display: 'flex' }}>
                            <div className={stylesheet.inputControl}>
                                <input
                                    className={stylesheet.input}
                                    type='text'
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className={stylesheet.smStateZipControl}><div className={stylesheet.cityStateZipLabel}>State:</div>
                                    <input
                                        style={{ width: '50px' }}
                                        type="text"
                                        value={state}
                                        onChange={e => setState(e.target.value)}
                                    />
                                </div>
                                <div className={stylesheet.smStateZipControl}><div className={stylesheet.cityStateZipLabel}>Zip:</div>
                                    <input
                                        style={{ width: '70px' }}
                                        type="text"
                                        value={zip}
                                        onChange={e => setZip(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={stylesheet.smRowControl}>
                        <div className={stylesheet.labelControl}>State:</div>
                        <div className={stylesheet.smInputControl}>
                            <input
                                className={stylesheet.smInputState}
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)}
                            />
                        </div>
                        <div className={stylesheet.labelControl}>Zip:</div>
                        <div className={stylesheet.smInputControl}>
                            <input
                                className={stylesheet.smInputZip}
                                type='text'
                                value={zip}
                                onChange={e => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={stylesheet.rowControl}>
                        <div style={{ fontSize: '12px' }} className={stylesheet.labelControl}>Order Taken By:</div>
                        <div className={stylesheet.inputControl}>
                            <input
                                className={stylesheet.input}
                                type='text'
                                value={email}
                            />
                        </div>
                    </div>
                    <div className={stylesheet.rowControl}>
                        {/* <div className={stylesheet.labelControl}>Order Taken By:</div> */}
                        <div style={{ display: 'flex', marginLeft: '5px', justifyContent: 'space-evenly', width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={workType === 'daywork'}
                                    onClick={e => setWorkType('daywork')}
                                />
                                <p style={{ fontSize: 'small' }}>Daywork</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={workType === 'contract'}
                                    onClick={e => setWorkType('contract')}
                                />
                                <p style={{ fontSize: 'small' }}>Contract</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={workType === 'extra'}
                                    onClick={e => setWorkType('extra')}
                                />
                                <p style={{ fontSize: 'small' }}>Extra</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }} className={stylesheet.rowControl}>
                        <button
                            onClick={e => createJob(e)}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
