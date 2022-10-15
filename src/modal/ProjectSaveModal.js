import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import DataService from '../services/data.service';
import styles from './modal-style/ProjectSaveModal.module.css'

export default function ProjectSaveModal({ save, click, isActive }) {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [error, setError] = useState({
        projectName: '',
        projectDescription: '',
    });

    useEffect(() => {
        let message = "";
        if (projectName) {
            let n = projectName.length;
            if (n > 30) {
                message = "Project Name must be less than 30"
            } else {
                DataService.validateProjectName(projectName).then(msg => {
                    setError((previousItems) => ({ ...previousItems, projectName: msg }));
                })
            }
            setError((previousItems) => ({ ...previousItems, projectName: message }));
        }
    }, [projectName])

    useEffect(() => {
        let message = "";
        if (projectDescription) {
            let n = projectDescription.length;
            if (n > 500) {
                message = "Description must be less than 500"
            }
            setError((previousItems) => ({ ...previousItems, projectDescription: message }));
        }
    }, [projectDescription])

    const validate = () => {
        let isValidProjectName = validateProjectName();
        // let isValidProjectDescription = validateProjectDescription();
        if (isValidProjectName && !error.projectName && !error.projectDescription) {
            save(projectName, projectDescription);
            clearState()
        }
        return;
    }

    const clearState = () => {
        setProjectName("")
        setProjectDescription("")
        setError({
            projectName: '',
            projectDescription: '',
        })
    }

    const validateProjectName = () => {
        if (!projectName) {
            setError((prevItems) => ({ ...prevItems, projectName: "Field is Required" }))
            return false;
        }
        return true;
    }

    // const validateProjectDescription = () => {
    //     if (!projectDescription) {
    //         setError((prevItems) => ({ ...prevItems, projectDescription: "Field is Required" }))
    //         return false;
    //     }
    //     return true;
    // }

    const handleProjectName = (event) => {
        let name = event.target.value;
        name = name.charAt(0).toUpperCase() + name.substr(1);
        setProjectName(name)
    }

    const handleProjectDescription = (event) => {
        let name = event.target.value;
        name = name.charAt(0).toUpperCase() + name.substr(1);
        setProjectDescription(name)
    }

    return (
        <div className={`${styles.modal} ${isActive && styles.modal__active}`}>
            <div className={`${styles.modal__content} ${isActive && styles.modal__content__active}`}>
                <span className={styles.close} onClick={() => {
                    clearState();
                    click();
                }}>&times;</span>
                <div className={`${styles.modal__header} ${styles.modal__dialog}`}>
                    <h1>Add Project</h1>
                </div>
                <div className={styles.modal__body}>
                    <Input label="Project Name"
                        type="text"
                        value={projectName}
                        onChange={handleProjectName}
                        helper={error.projectName} />
                    <TextArea label="Project Description"
                        rows="5"
                        limit={`${projectDescription.length}/500`}
                        helper={error.projectDescription}
                        onChange={handleProjectDescription}
                        value={projectDescription} />
                </div>
                <div className={styles.modal__footer}>
                    <button className={styles.save} onClick={validate}>
                        Save
                    </button>
                    <button className={styles.cancel} onClick={() => {
                        clearState();
                        click();
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
