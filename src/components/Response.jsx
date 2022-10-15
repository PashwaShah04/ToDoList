import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import styles from './components-styles/Response.module.css'

export default function Response() {
    return (
        <div className={styles.response__holder}>
            <div className={styles.scroll__holder}>
                <NavLink className={({ isActive }) => {
                    return `${styles.scroll} ${isActive && styles.active}`
                }}
                    to="/login" end>
                    <h4 className={styles.text}>
                        Login
                    </h4>
                </NavLink>
                <NavLink className={({ isActive }) => {
                    return `${styles.scroll} ${isActive && styles.active}`
                }}
                    to="/signup">
                    <h4 className={styles.text}>
                        Sign Up
                    </h4>
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}
