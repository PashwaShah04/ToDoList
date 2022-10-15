import React from 'react'
import styles from './components-styles/TextArea.module.css'

export default function TextArea({ label, helper,limit, ...props }) {
  return (
    <div className={styles.input__holder}>
      <label className={styles.input}>
        <textarea className={styles.input__field} required {...props}></textarea>
        <span className={styles.input__label}>{label}</span>
        <span className={styles.input__helper}>{helper}</span>
        <span className={styles.input__limit}>{limit}</span>
      </label>
    </div>
  )
}
