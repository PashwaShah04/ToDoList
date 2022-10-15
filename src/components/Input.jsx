import React from 'react'
import styles from './components-styles/Input.module.css'

export default function Input({ label, helper, ...props }) {
  return (
    <div className={styles.input__holder}>
      <label className={styles.input}>
        <input className={styles.input__field} required {...props}></input>
        <span className={styles.input__label}>{label}</span>
        <span className={styles.input__helper}>{helper}</span>
      </label>
    </div>
  )
}
