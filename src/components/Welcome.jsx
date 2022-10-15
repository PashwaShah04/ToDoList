import React from 'react'
import styles from './components-styles/Welcome.module.css'
import Response from './Response'

export default function Welcome() {
    return (
        <div className={styles.container__holder}>
            <div className={styles.container}>
                <header>
                    <h1>Welcome to ToDoList</h1>
                </header>
                <Response />
            </div>
        </div>
    )
}
