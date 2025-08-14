import styles from './AppNav.module.css'
import { NavLink } from 'react-router-dom';
function AppNav() {
    return (
        <div className={styles.nav}>
            <ul className={styles.tabs}>
                <li className={styles.item} >
                    <NavLink to="cities"  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>Cities</NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to="countries" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>Countries</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AppNav
