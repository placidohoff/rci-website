import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import navStyles from '../styles/DashNav.module.css'

export default function DashNav() {
    const [showDrawer, setShowDrawer] = useState(false)

    const ShowDrawer = () => {
        return (

            <Drawer
                anchor={'left'}
                open={showDrawer}
                onClose={e => setShowDrawer(false)}

            >
                <div className={navStyles.drawerBody}>
                    <div className={navStyles.drawerClose}><AiOutlineCloseSquare onClick={e => setShowDrawer(false)} /></div>
                    {/* <hr style={{ marginTop: '-40px' }} /> */}
                    <div className={navStyles.drawerNav}>
                        <Link href='/'><div onClick={e => setShowDrawer(false)}>Clock In</div></Link>
                        <Link href='/services'><div onClick={e => setShowDrawer(false)}>Time-Card</div></Link>
                        <Link href='/contact'><div onClick={e => setShowDrawer(false)}>View Job-Sites</div></Link>
                        <Link href='/employees'><div onClick={e => setShowDrawer(false)}>View Employees</div></Link>
                        
                    </div>
                </div>
            </Drawer>

        )
    }

    return (
        <div>
            <ShowDrawer />
            <GiHamburgerMenu
                className={navStyles.hamburger}
                onClick={e => setShowDrawer(true)}
            />
        </div>
    )
}
