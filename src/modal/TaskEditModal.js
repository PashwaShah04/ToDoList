import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import CustomSelect from '../components/CustomSelect';
import styles from './modal-style/TaskEditModal.module.css'
import DataService from '../services/data.service';

export default function TaskEditModal({ save, click, isActive, task }) {
    const [taskName, setTaskName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({ value: '', label: '' });

    const [startType, setStartType] = useState("text")
    const [endType, setEndType] = useState("text")
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const status = [{ value: "NotStarted", label: "To do" },
    { value: "OnGoing", label: "In Progress" },
    { value: "Completed", label: "Completed" }]
    const [isStatusDropdown, setStatusDropdown] = useState(false)

    const [error, setError] = useState({
        taskName: '',
        project: '',
        status: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        setTaskName(task.taskName);
        status.filter(res => res.value === task.status).find(res => setSelectedStatus({ value: res.value, label: res.label }))
        setStartDate(new Date(task.startDate).toISOString().slice(0, 10));
        setEndDate(new Date(task.endDate).toISOString().slice(0, 10));
    }, [task])

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
        if (taskName !== task.taskName) {
            DataService.validateTaskNameOfProject(task.project.projectName, taskName).then(msg => {
                setError((previousItems) => ({ ...previousItems, taskName: msg }));
            })
        }
    }

    const validate = () => {
        let isValidTaskName = validateTaskName();
        let isValidStatus = validateStatus();
        let isValidStartDate = validateStartDate();
        let isValidEndDate = validateEndDate();
        if (isValidTaskName && isValidStatus && isValidStartDate && isValidEndDate &&
            !error.taskName && !error.project && !error.status && !error.startDate && !error.endDate) {
            save(taskName, selectedStatus.value, startDate, endDate);
            setState(taskName, selectedStatus, startDate, endDate);
        }
        return;
    }

    const setState = (taskName, newStatus, startDate, endDate) => {
        setTaskName(taskName);
        status.filter(res => res.value === newStatus.value).find(res => setSelectedStatus({ value: res.value, label: res.label }))
        setStartDate(new Date(startDate).toISOString().slice(0, 10));
        setEndDate(new Date(endDate).toISOString().slice(0, 10));
    }

    const clearState = () => {
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
        (event.target.name === "start") ? setStartType("date") : setEndType("date")
    }

    const handleDateOnBlur = (event) => {
        (event.target.name === "start") ? setStartType("text") : setEndType("text")
    }


    return (
        <div className={`${styles.modal} ${isActive && styles.modal__active}`}>
            <div className={`${styles.modal__content} ${isActive && styles.modal__content__active}`}>
                <span className={styles.close} onClick={() => {
                    clearState();
                    click();
                }}>&times;</span>
                <div className={`${styles.modal__header} ${styles.modal__dialog}`}>
                    <h1>Update Task</h1>
                </div>
                <div className={styles.modal__body}>
                    <Input label="Task Name"
                        type="text"
                        value={taskName}
                        onChange={handleTaskName}
                        helper={error.taskName} />

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
                                }}>
                                {status.label}
                            </li>
                        ))}

                    </CustomSelect>

                    <Input label="Start Date"
                        name="start"
                        type={startType}
                        value={startDate}
                        onChange={handleStartDate}
                        helper={error.startDate}
                        onFocus={handleDateOnFocus}
                        onBlur={handleDateOnBlur} />

                    <Input label="End Date"
                        name="end"
                        type={endType}
                        value={endDate}
                        onChange={handleEndDate}
                        helper={error.endDate}
                        onFocus={handleDateOnFocus}
                        onBlur={handleDateOnBlur}
                        min={startDate} />


                </div>
                <div className={styles.modal__footer}>
                    <button className={styles.save} onClick={() => {
                        if (task.taskName !== taskName || task.status !== selectedStatus.value || task.startDate !== startDate || task.endDate !== endDate) {
                            validate();
                        } else {
                            click();
                        }
                    }}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
