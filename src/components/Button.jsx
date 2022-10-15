import React from 'react'
import styles from './components-styles/Button.module.css'

export default function Button({text,...props}) {
    return (
        <div className={styles.button__holder}>
            <button {...props} className={styles.button}>{text}</button>
        </div>
    )
}
