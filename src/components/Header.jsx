import React from 'react'
import styles from "./components-styles/Header.module.css";
import '../index.module.css';

export default function Header() {
    return (
        <h1 className={styles.heading}> ToDoList</h1>
    )
}
