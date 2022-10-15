import React, { useState, useEffect, useContext } from 'react'
import Input from '../components/Input'
import CustomSelect from '../components/CustomSelect';
import AppContext from '../Contexts/AppContext';
import styles from './modal-style/TaskSaveModal.module.css'
import DataService from '../services/data.service';

export default function TaskSaveModal({ save, click, isActive }) {
    const [taskName, setTaskName] = useState("");
    const [selectedProject, setSelectedProject] = useState({ projectName: '', projectDescription: '' });
    const [selectedStatus, setSelectedStatus] = useState({ value: '', label: '' });

    const [startType, setStartType] = useState("text")
    const [endType, setEndType] = useState("text")
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [isProjectDropdown, setProjectDropdown] = useState(false)
    const status = [{ value: "NotStarted", label: "To do" },
    { value: "OnGoing", label: "In Progress" },
    { value: "Completed", label: "Completed" }]
    const [isStatusDropdown, setStatusDropdown] = useState(false)

    const [state, dispatch] = useContext(AppContext)

    const [error, setError] = useState({
        taskName: '',
        project: '',
        status: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        let message = "";
        if (taskName) {
            let n = taskName.length;
            if (n > 30) {
                message = "Task Name must be less than 30"
            } else {
                validateTask();
            }
            setError((previousItems) => ({ ...previousItems, taskName: message }));
        }
    }, [taskName])

    useEffect(() => {
        let message = "";
        if (selectedProject.projectName) {
            validateTask();
            setError((previousItems) => ({ ...previousItems, project: message }));
        }
    }, [selectedProject.projectName])

    useEffect(() => {
        let message = "";
        if (selectedStatus.value) {

            setError((previousItems) => ({ ...previousItems, status: message }));
        }
    }, [selectedStatus.value])

    useEffect(() => {
        let message = "";
        if (startDate) {
            setError((previousItems) => ({ ...previousItems, startDate: message }));
        }
    }, [startDate])

    useEffect(() => {
        let message = "";
        if (endDate) {

            setError((previousItems) => ({ ...previousItems, endDate: message }));
        }
    }, [endDate])

    const validateTask = () => {
        if (selectedProject.projectName !== '') {
            DataService.validateTaskNameOfProject(selectedProject.projectName, taskName).then(msg => {
                setError((previousItems) => ({ ...previousItems, taskName: msg }));
            })
        }
    }

    const validate = () => {
        let isValidTaskName = validateTaskName();
        let isValidProject = validateProject();
        let isValidStatus = validateStatus();
        let isValidStartDate = validateStartDate();
        let isValidEndDate = validateEndDate();
        if (isValidTaskName && isValidProject && isValidStatus && isValidStartDate && isValidEndDate &&
            !error.taskName && !error.project && !error.status && !error.startDate && !error.endDate) {
            save(taskName, selectedProject, selectedStatus.value, startDate, endDate)
            clearState();
        }
        return;
    }

    const clearState = () => {
        setTaskName('')
        setSelectedProject({ projectName: '', projectDescription: '' })
        setSelectedStatus({ value: '', label: '' })
        setStartDate('')
        setEndDate('')
        setProjectDropdown(false)
        setStatusDropdown(false)
        setError({
            taskName: '',
            project: '',
            status: '',
            startDate: '',
            endDate: ''
        })
    }

    const validateTaskName = () => {
        if (!taskName) {
            setError((prevItems) => ({ ...prevItems, taskName: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateProject = () => {
        if (!selectedProject.projectName) {
            setError((prevItems) => ({ ...prevItems, project: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateStatus = () => {
        if (!selectedStatus.value) {
            setError((prevItems) => ({ ...prevItems, status: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateStartDate = () => {
        if (!startDate) {
            setError((prevItems) => ({ ...prevItems, startDate: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateEndDate = () => {
        if (!endDate) {
            setError((prevItems) => ({ ...prevItems, endDate: "Field is Required" }))
            return false;
        }
        if (new Date(endDate) < new Date(startDate)) {
            setError((prevItems) => ({ ...prevItems, endDate: "End Date should be greater than start date" }))
            return false;
        }
        return true;
    }

    const handleTaskName = (event) => {
        let name = event.target.value;
        name = name.charAt(0).toUpperCase() + name.substr(1);
        setTaskName(name)
    }

    const handleClickToSelectProject = (project) => {
        setSelectedProject({ projectName: project.projectName, projectDescription: project.projectDescription });
    }

    const getProjectDropdown = () => {
        setProjectDropdown(prev => !prev)
    }

    const handleClickToSelectStatus = (status) => {
        setSelectedStatus({ value: status.value, label: status.label });
    }

    const getStatusDropdown = () => {
        setStatusDropdown(prev => !prev)
    }

    const handleStartDate = (event) => {
        let date = event.target.value;
        setStartDate(date)
    }

    const handleEndDate = (event) => {
        let date = event.target.value;
        setEndDate(date)
    }

    const handleDateOnFocus = (event) => {
        (event.target.id === "start") ? setStartType("date") : setEndType("date")
    }

    const handleDateOnBlur = (event) => {
        (event.target.id === "start") ? setStartType("text") : setEndType("text")
    }


    return (
        <div className={`${styles.modal} ${isActive && styles.modal__active}`}>
            <div className={`${styles.modal__content} ${isActive && styles.modal__content__active}`}>
                <span className={styles.close} onClick={() => {
                    clearState();
                    click();
                }}>&times;</span>
                <div className={`${styles.modal__header} ${styles.modal__dialog}`}>
                    <h1>Add Task</h1>
                </div>
                <div className={styles.modal__body}>
                    <Input label="Task Name"
                        type="text"
                        value={taskName}
                        onChange={handleTaskName}
                        helper={error.taskName} />

                    <CustomSelect label="Project"
                        value={selectedProject.projectName}
                        onUserClick={getProjectDropdown}
                        dropDown={isProjectDropdown}
                        helper={error.project}>

                        {state.projects.map(project => (
                            <li key={project.projectId}
                                className={styles.option}
                                onClick={() => {
                                    handleClickToSelectProject(project)
                                }}
                                onFocus={() => {
                                    handleClickToSelectProject(project)
                                    getProjectDropdown();
                                }}>
                                {project.projectName}
                            </li>
                        ))}

                    </CustomSelect>

                    <CustomSelect label="Status"
                        value={selectedStatus.label}
                        onUserClick={getStatusDropdown}
                        dropDown={isStatusDropdown}
                        helper={error.status}>

                        {status.map(status => (
                            <li key={status.value}
                                className={styles.option}
                                onClick={() => {
                                    handleClickToSelectStatus(status)
                                }}
                                onFocus={() => {
                                    handleClickToSelectStatus(status)
                                    getStatusDropdown();
                                }}
                            >
                                {status.label}
                            </li>
                        ))}

                    </CustomSelect>

                    <Input label="Start Date"
                        id="start"
                        type={startType}
                        value={startDate}
                        onChange={handleStartDate}
                        helper={error.startDate}
                        onFocus={handleDateOnFocus}
                        onBlur={handleDateOnBlur} />

                    <Input label="End Date"
                        id="end"
                        type={endType}
                        value={endDate}
                        onChange={handleEndDate}
                        helper={error.endDate}
                        onFocus={handleDateOnFocus}
                        onBlur={handleDateOnBlur}
                        min={startDate} />


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
