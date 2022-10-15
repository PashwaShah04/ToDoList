const setProjects = (projects) => {
    return {
        type: 'SET_PROJECTS',
        loadedProjects: projects
    }
}

const setProject = (project) => {
    return {
        type: 'SELECTED_PROJECT',
        selectedProject: project
    }
}

const setTasksByProjectId = (tasks) => {
    return {
        type: 'SET_TASKS_BY_PROJECT',
        selectedTasks: tasks
    }
}

const setAllTasks = (tasks) => {
    return {
        type: 'SET_ALL_TASKS',
        loadedTasks: tasks
    }
}

const addProject = (project) => {
    return {
        type: 'ADD_PROJECT',
        newProject: project
    }
}

const addTask = (task) => {
    return {
        type: 'ADD_TASK',
        newTask: task
    }
}

const updateTask = (tasks, newTask) => {
    return {
        type: 'UPDATE_TASK',
        allTasks: tasks,
        updatedTask: newTask
    }
}

const deleteTask = (tasks) => {
    return {
        type: 'DELETE_TASK',
        deletedTask: tasks
    }
}

const AppActions = {
    setProjects, setProject, setTasksByProjectId, setAllTasks, addProject, addTask, updateTask, deleteTask
}

export default AppActions;