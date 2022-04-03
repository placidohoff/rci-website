import { useState } from 'react'
import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import logo from '../assets/rci-logo.png'
import Image from 'next/image'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import Drawer from '@material-ui/core/Drawer'

export default function Nav() {

    const [showDrawer, setShowDrawer] = useState(false)

    const ShowDrawer = () => {
        return (
            <Drawer
                anchor={'right'}
                open={showDrawer}
                onClose={e => setShowDrawer(false)}
 
            >
                <div className={navStyles.drawerBody}>
                    <div className={navStyles.drawerClose}>{/*<p><Image className={navStyles.image} src={logo} alt='test' /></p>*/}<p><AiOutlineCloseSquare onClick={e => setShowDrawer(false)} /></p></div>
                    <hr style={{marginTop: '-40px'}} />
                    <div className={navStyles.drawerNav}>
                        <div>Get An Estimate</div>
                        <Link href='/'><div onClick={e => setShowDrawer(false)}>Home</div></Link>
                        <Link href='/services'><div onClick={e => setShowDrawer(false)}>Services</div></Link>
                        {/* <Link href='/services'><div>About Us</div></Link> */}
                        <Link href='/contact'><div onClick={e => setShowDrawer(false)}>Contact</div></Link>
                        <Link href='/services'><div onClick={e => setShowDrawer(false)}>Log In</div></Link>
                    </div>
                </div>
            </Drawer>
        )
    }

    return (
        <>

            <ShowDrawer />

            <nav className={navStyles.nav}>
                <div className={navStyles.left}>
                    <Link href='/'>
                        <Image className={navStyles.image} src={logo} alt='test' />
                    </Link>
                    <ul>
                        <li className={navStyles.link}>
                            <Link href='/services' >Services </Link>
                        </li>
                        {/* <li className={navStyles.link}>
                            <Link href='/about'> About Us </Link>
                        </li> */}
                        <li className={navStyles.link}>
                            <Link href='/contact'> Contact </Link>
                        </li>
                        <li className={navStyles.estimateLink}>
                            <Link href='/contact'> Free Estimate </Link>
                        </li>

                    </ul>
                </div>
                <div className={navStyles.right}>
                    <div className={navStyles.contactEstimateBox}>
                        <p className={navStyles.phoneWrap}>
                            <span className={navStyles.phone}><BsFillTelephoneFill /></span>
                            <span>(401) 555 - 6789</span>
                        </p>
                        <div className={navStyles.estimate}>Get a FREE estimate</div>
                    </div>
                    <div className={navStyles.login}><Link href='/' >Login</Link></div>
                    <div className={navStyles.hamburger}>
                        <GiHamburgerMenu
                            onClick={e => setShowDrawer(true)}
                        />
                    </div>
                </div>
            </nav>



        </>
    )
}