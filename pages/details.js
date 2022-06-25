import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useStateValue } from '../redux/StateProvider'
import stylesheet from '../styles/JobDetails.module.css'

export default function Details() {
    const [{ userFirstName, isLoggedIn, loadedJobSite }, dispatch] = useStateValue()
    const router = useRouter()
    // const listMaterials = new Array(22)
    // for(let i = 0; i < listMaterials.length; i++){
    //     listMaterials[i] = ''
    // }
    const listMaterials = loadMaterialsList()

    useEffect(() => {
        if (!isLoggedIn) router.push('/')
    }, [])

    function loadMaterialsList() {
        if(loadedJobSite.materialsList == []) return['1']
        else return ['', '']
    }



    const ListMaterials = () => {
        console.log('MATERIALS', listMaterials)
        return (
            listMaterials.map(material => {
                return (
                    <div 
                        key={Math.random()}
                        style={{ display: 'flex', fontSize: 'x-small', fontWeight: 'bold', width: '100%', border: '1px solid black' }}
                    >
                        <div className={`${stylesheet.mdOnly} ${stylesheet.mdQty}`}><input value={material.qty} style={{ width: '100%', border: 'none' }} type="text" /></div>
                        <div className={`${stylesheet.mdOnly} ${stylesheet.mdMaterial}`}><input value={material.material} style={{ width: '100%', border: 'none', fontSize: 'small' }} type="text" /></div>
                        <div className={`${stylesheet.mdOnly} ${stylesheet.mdPrice}`}><input value={material.price} style={{ width: '100%', border: 'none' }} type="text" /></div>
                        <div className={`${stylesheet.mdOnly} ${stylesheet.mdAmount}`}><input value={material.amount} style={{ width: '100%', border: 'none' }} type="text" /></div>
                    </div>
                )
            })
        )
    }

    const MaterialItem = () => {
        return (
            <div style={{ display: 'flex', fontSize: 'x-small', fontWeight: 'bold', width: '100%', border: '1px solid black' }}>
                <div className={`${stylesheet.mdOnly} ${stylesheet.mdQty}`}><input style={{ width: '100%', border: 'none' }} type="text" /></div>
                <div className={`${stylesheet.mdOnly} ${stylesheet.mdMaterial}`}><input style={{ width: '100%', border: 'none', fontSize: 'small' }} type="text" /></div>
                <div className={`${stylesheet.mdOnly} ${stylesheet.mdPrice}`}><input style={{ width: '100%', border: 'none' }} type="text" /></div>
                <div className={`${stylesheet.mdOnly} ${stylesheet.mdAmount}`}><input style={{ width: '100%', border: 'none' }} type="text" /></div>
            </div>
        )
    }

    return (
        <div style={{ height: '100vh', marginLeft: 'auto', marginRight: 'auto', width: '90%', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black' }}>
                <div style={{ width: '50%', border: '1px solid green' }}>RCI</div>
                <div>Details</div>
            </div>
            <div style={{ display: 'inline-block', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    {/* <div>QTY|MATERIAL|PRICE|AMOUNT</div> */}
                    <div style={{ width: '50%' }}>
                        <p className={`${stylesheet.smOnly}`}>Materials: 0</p>
                        <div style={{ display: 'flex', fontSize: 'x-small', fontWeight: 'bold', width: '100%', border: '1px solid black' }}>
                            <div className={`${stylesheet.mdOnly} ${stylesheet.mdQty}`}>QTY</div>
                            <div className={`${stylesheet.mdOnly} ${stylesheet.mdMaterial}`}>MATERIAL</div>
                            <div className={`${stylesheet.mdOnly} ${stylesheet.mdPrice}`}>Price</div>
                            <div className={`${stylesheet.mdOnly} ${stylesheet.mdAmount}`}>Amount</div>
                        </div>

                        <ListMaterials />
                        
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid black' }}>
                        <div>Description</div>
                        <div>Other Charges</div>
                        <div>Labor Charges</div>
                        <div>Total Labor: 0</div>
                        <div>Total Materials: 0</div>
                        <div>Total Other: 0</div>
                        <div>Tax: 0</div>
                        <div>TOTAL: 0</div>
                    </div>
                </div>
            </div>
            {console.log(loadedJobSite)}
        </div>
    )
}
