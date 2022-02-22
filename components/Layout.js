import styles from '../styles/Layout.module.css'
import Nav from './Nav'

export default ({ children }) => {
    return (
        <>
            <Nav />
            <div className={styles.container}>

                {children}
            </div>
        </>
    )
}