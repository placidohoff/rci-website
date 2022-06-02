import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import homeImage from '../assets/rci-home.png'
import homeImage from '../assets/rci-home.png'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.sideA}>
        <p className={styles.mainText}>Providing Commercial and Residential Services For Over 20 Years</p>
        <p className={styles.subText}>Licensed Master Electrician For Work In:</p>
        <p className={styles.subText}>RI , MA , CT , NH</p>
        <Link href='/services'>
          <div className={styles.buttonWrap}><p className={styles.mainButton}>See What We Can Do For You</p></div>
        </Link>
      </div>
      <div className={styles.sideB}>
        <Image
          src={homeImage}
          className={styles.homeImage}
        />
      </div>
    </div>
  )
}
