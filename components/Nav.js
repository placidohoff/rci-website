import navStyles from '../styles/Nav.module.css'
import Link from 'next/Link'
import logo from '../assets/rci-logo.png'
import Image from 'next/image'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Nav() {
    return (
        <>

            <nav className={navStyles.nav}>
                <div className={navStyles.left}>
                    <Link href='/'>
                        <Image className={navStyles.image} src={logo} alt='test' />
                    </Link>
                    <ul>
                        <li>
                            <Link href='/services'> Services </Link>
                        </li>
                        <li>
                            <Link href='/about'> About Us </Link>
                        </li>
                        <li>
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
                        <GiHamburgerMenu />
                    </div>
                </div>
            </nav>



        </>
    )
}