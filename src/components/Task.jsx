import React, { useContext, useState } from 'react'
import styles from './components-styles/Task.module.css'
import { MdDelete, MdEdit } from 'react-icons/md'
import TaskEditModal from '../modal/TaskEditModal'
import DataService from '../services/data.service';
import AppActions from '../Actions/AppActions';
import AppContext from '../Contexts/AppContext';

export default function Task({ task, onUpdate }) {

    const [isAddTask, setAddTask] = useState(false);

    const [state, dispatch] = useContext(AppContext)

    const handleTaskClick = () => {
        setAddTask(prev => !prev);
    }

    const handleSaveTaskClick = (taskName, status, startDate, endDate) => {
        DataService.updateTask(task.taskId, taskName, status, startDate, endDate, task.project).then(newTask => {
            onUpdate(newTask);
        })
        setAddTask(prev => !prev)
    }

    const deleteTask = () => {
        DataService.deleteTask(task.taskId).then(value => {
            dispatch(AppActions.deleteTask(state.tasks.filter(task => task.taskId !== value.taskId)))
        })
    }

    return (
        <div className={styles.task__holder}>
            <h4>{task.taskName}</h4>
            <div>
                <MdEdit className={`${styles.edit} ${styles.icon__style}`} onClick={handleTaskClick} />
                <MdDelete className={`${styles.edit} ${styles.icon__style}`} onClick={deleteTask} />
            </div>

            <TaskEditModal save={handleSaveTaskClick} click={handleTaskClick} isActive={isAddTask} task={task} />
        </div>
    )
}
