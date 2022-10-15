import React, { useState } from 'react'
import styles from './components-styles/CustomSelect.module.css'

export default function CustomSelect({ label, helper, value, dropDown, onUserClick, ...props }) {



    return (
        <div className={styles.input__holder} >
            <label className={styles.input} >
                <input className={styles.input__field} required value={value} onChange={() => { }} onClick={onUserClick} />
                <span className={styles.input__label}>{label}</span>
                <ul className={`${styles.dropdown__menu} ${dropDown ? styles.dropdown__menu__click : ""}`}>
                    {props.children}
                </ul>
                <span className={styles.input__helper}>{helper}</span>
            </label>
            <i className={`${styles.arrow} ${styles.down}`}></i>
        </div>
    )
}
