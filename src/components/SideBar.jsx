import { Outlet } from "react-router-dom"
import Logo from "./Logo"
import styles from "./Sidebar.module.css"
import AppNav from './AppNav';

function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            
            <main className={styles.main}>  
                <AppNav />
                
                <Outlet/>
            </main>
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWide Inc.
                </p>
            </footer>
        </div>
    )
}

export default SideBar
