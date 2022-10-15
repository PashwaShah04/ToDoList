import React from 'react'
import styles from './components-styles/Project.module.css'
import '../index.module.css';

export default function Project(props) {
    const isActive = props.active === "active" ? true : false;
    const class1 = `${styles.project} ${styles.holder} ${isActive ? styles.active : ""}`;
    return (
        <div className={class1}>
            Project 1
        </div>
    )
}
