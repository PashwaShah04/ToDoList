import React, { useContext, useEffect, useState } from 'react'
import useCollapse from 'react-collapsed'
import styles from './components-styles/Tasks.module.css'
import Status from './Status'
import { FaPlus } from 'react-icons/fa'
import '../index.module.css';
import { useParams } from 'react-router-dom';
import DataService from '../services/data.service';
import AppContext from '../Contexts/AppContext';
import AppActions from '../Actions/AppActions';
import TaskSaveModal from '../modal/TaskSaveModal'

export default function Tasks() {
    const params = useParams();
    const [state, dispatch] = useContext(AppContext);
    const [isAddTask, setAddTask] = useState(false);
    const config = {
        duration: 600,
        collapsedHeight: 25
    }
    const { getCollapseProps, isExpanded, setExpanded } = useCollapse(config);

    useEffect(() => {
        if (params.projectId) {
            DataService.getProject(parseInt(params.projectId), 10).then(value => {
                dispatch(AppActions.setProject(value));
                dispatch(AppActions.setTasksByProjectId(state.tasks.filter(task => task.project.projectId === value.projectId)));
            })
        } else {
            dispatch(AppActions.setProject({}))
            dispatch(AppActions.setTasksByProjectId(state.tasks))
        }
        setExpanded(false)
    }, [params, state.tasks])

    const toggleProjectDescription = () => {
        setExpanded(prev => !prev);
    }

    const handleTaskClick = () => {
        setAddTask(prev => !prev);
    }

    const handleSaveTaskClick = (taskName, project, status, startDate, endDate) => {
        DataService.addTask(taskName, status, startDate, endDate, project).then(value => {
            dispatch(AppActions.addTask(value))
        })
        setAddTask(prev => !prev)
    }


    return (
        <div className={styles.holder}>
            <div className={styles.project}>
                <div className={styles.project__details}>
                    <h2>
                        {JSON.stringify(state.selectedProject) !== '{}' ?
                            `${state.selectedProject.projectName}` :
                            `All Projects`}
                    </h2>
                    <p {...getCollapseProps()}>
                        {JSON.stringify(state.selectedProject) === '{}' ?
                            `` :
                            (state.selectedProject.projectDescription) ?
                                `${state.selectedProject.projectDescription}` :
                                ``}
                    </p>
                    <span className={styles.toggle} onClick={toggleProjectDescription}>
                        {JSON.stringify(state.selectedProject) !== '{}' ?
                            (state.selectedProject.projectDescription) ?
                                `${isExpanded ?
                                    `less` :
                                    `more`}` :
                                `` :
                            ``}
                    </span>
                </div>
                <div className={styles.add} onClick={handleTaskClick}>
                    <FaPlus className='plus icon-style' />
                </div>
            </div>
            <TaskSaveModal save={handleSaveTaskClick} click={handleTaskClick} isActive={isAddTask} />
            {state.tasksOfProject.length !== 0 || JSON.stringify(state.selectedProject) === '{}' ?
                <div className={styles.tasks}>
                    <Status status="To do" />
                    <Status status="In Progress" />
                    <Status status="Completed" />
                </div> :
                <div className={styles.no__project}>
                    <h1>
                        This project has no tasks.
                    </h1>
                    <p>Click <a style={{ color: "#f16249", cursor: "pointer", textDecoration: "underline" }}
                        onClick={handleTaskClick}
                    >here
                    </a>
                        {` to add new task.`}
                    </p>
                </div>
            }
        </div>
    )
}
