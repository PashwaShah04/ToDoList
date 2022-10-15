/**
    projects: [],
    selectedProject: { },
    tasks: [],
    tasksOfProject: []
*/

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return { ...state, projects: action.loadedProjects }
        case 'SELECTED_PROJECT':
            return { ...state, selectedProject: action.selectedProject }
        case 'SET_TASKS_BY_PROJECT':
            return { ...state, tasksOfProject: action.selectedTasks }
        case 'SET_ALL_TASKS':
            return { ...state, tasks: action.loadedTasks }
        case 'ADD_PROJECT':
            return { ...state, projects: [...state.projects, action.newProject] }
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.newTask] }
        case 'UPDATE_TASK':
            return { ...state, tasks: [...action.allTasks, action.updatedTask] }
        case 'DELETE_TASK':
            return { ...state, tasks: action.deletedTask }
        default:
            return state
    }
}

export default appReducer;