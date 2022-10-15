import React, { useContext, useEffect, useState } from 'react'
import styles from './components-styles/Status.module.css'
import Task from './Task'
import '../index.module.css';
import AppContext from '../Contexts/AppContext'
import AppActions from '../Actions/AppActions';

export default function Status(props) {
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState([]);
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        getStatus();
    }, [state.tasksOfProject])

    useEffect(() => {
        if (state.tasksOfProject.length !== 0) {
            setTasks(state.tasksOfProject.filter(task => task.status === status))
        }
    }, [status, state.tasksOfProject])



    const getStatus = () => {
        switch (props.status) {
            case "To do":
                setStatus("NotStarted")
                break;
            case "In Progress":
                setStatus("OnGoing")
                break;
            case "Completed":
                setStatus("Completed")
                break;
            default: setStatus("")
        }
    }

    return (
        <div className={styles.status__holder}>
            <div className={styles.heading}>
                <h3 className={styles.status__text}>{props.status}</h3>
                <p className={styles.count}>{tasks.length}</p>
            </div>
            {tasks?.map((task) => (
                <Task task={task}
                    key={task.taskId}
                    onUpdate={(newTask) => {
                        dispatch(AppActions.updateTask(state.tasks.filter(res => res.taskId !== newTask.taskId), newTask))
                    }}
                />))}
        </div>
    )
}
