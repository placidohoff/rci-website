import { useState } from 'react'
import { useRouter } from 'next/router'
import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import logo from '../assets/rci-logo.png'
import Image from 'next/image'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import Drawer from '@material-ui/core/Drawer'
import { useStateValue } from '../redux/StateProvider'
import * as actionTypes from '../redux/actionTypes'
import Login from './Login'

export default function Nav() {

    const [showDrawer, setShowDrawer] = useState(false)
    const [{ isLoggedIn }, dispatch] = useStateValue()
    const [showLogin, setShowLogin] = useState(false)
    const router = useRouter()

    const ShowDrawer = () => {
        return (
            <Drawer
                anchor={'right'}
                open={showDrawer}
                onClose={e => setShowDrawer(false)}

            >
                <div className={navStyles.drawerBody}>
                    <div className={navStyles.drawerClose}>{/*<p><Image className={navStyles.image} src={logo} alt='test' /></p>*/}<p><AiOutlineCloseSquare onClick={e => setShowDrawer(false)} /></p></div>
                    <hr style={{ marginTop: '-40px' }} />
                    <div className={navStyles.drawerNav}>
                        <div>Get An Estimate</div>
                        <Link href='/'><div onClick={e => setShowDrawer(false)}>Home</div></Link>
                        <Link href='/services'><div onClick={e => setShowDrawer(false)}>Services</div></Link>
                        {/* <Link href='/services'><div>About Us</div></Link> */}
                        <Link href='/contact'><div onClick={e => setShowDrawer(false)}>Contact</div></Link>
                        {
                            isLoggedIn &&
                            <Link href='/dashboard'><div onClick={e => setShowDrawer(false)}>Dashboard</div></Link>
                        }
                        <br />
                        {
                            !isLoggedIn &&
                            <div onClick={e => {setShowDrawer(false); setShowLogin(true)}}>Log In</div>
                        }
                        {
                            isLoggedIn &&
                            <Link href='/'><div onClick={e => { LogOut(); }}>Log Out</div></Link>
                        }
                    </div>
                </div>
            </Drawer>
        )
    }

    const LogOut = () => {
        dispatch({
            type: actionTypes.LOGOUT
        })
        localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME, null)
        router.push('/')
        
    }

    const ShowLogIn = () => {
        return (

            <Login
                isOpen={showLogin}
                closeModalFn={() => setShowLogin(false)}
            />
        )
    }

    return (
        <>

            <ShowDrawer />

            <ShowLogIn />

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
                        {
                            isLoggedIn &&
                            <li className={navStyles.link}>
                                <Link href='/dashboard'> Dashboard </Link>
                            </li>
                        }
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
                    {
                        !isLoggedIn &&
                        <div className={navStyles.login} onClick={e => setShowLogin(true)}>{/*<Link href='/login' >*/}Log In{/*</Link>*/}</div>
                    }
                    {
                        isLoggedIn &&
                        <div className={navStyles.login} onClick={e => LogOut()}><Link href='#' >Log Out</Link></div>
                    }
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