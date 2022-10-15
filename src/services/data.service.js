import axios from 'axios';
import AuthService from './auth.service';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:8080/todolist";

const getProjects = async () => {
    const data = await axios.get(`${API_URL}/projects`, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data
        }, (error) => {
            console.log(error);
        }
    )
    return data
}

const getProject = async (projectId) => {
    const data = await axios.get(`${API_URL}/${projectId}`, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data;
        }, (error) => {
            console.log("project load error");
        }
    );
    return data;
}

const getTasksOfProjectByStatus = async (projectId, status) => {
    const data = await axios.get(`${API_URL}/project/${projectId}/status/${status}`, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            console.log(error)
        }
    )
    return data;
}

const getTasksByStatus = async (status) => {
    const data = await axios.get(`${API_URL}/status/${status}`, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            console.log(error)
        }
    )
    return data;
}

const getTasks = async () => {
    const data = await axios.get(`${API_URL}/task`, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data
        },
        (error) => {
            console.log(error)
        }
    )
    return data;
}

const getTasksByProjectId = async (projectId) => {
    const data = await axios.get(`${API_URL}/project/${projectId}`, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data
        }, (error) => {
            console.log(error)
        }
    )
    return data;
}

const addProject = async (projectName, projectDescription) => {
    const data = await axios.post(`${API_URL}/projects/add`, { projectName, projectDescription }, { headers: AuthService.authHeader() }).then(
        (response) => {
            toast.success(`${response.data.projectName} added successfully.`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return response.data
        },
        (error) => {
            toast.error('Something went Wrong.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            console.log(error)
        }
    )
    return data;
}

const addTask = async (taskName, status, startDate, endDate, project) => {
    const data = await axios.post(`${API_URL}/task/add`, { taskName, status, startDate, endDate, project }, { headers: AuthService.authHeader() }).then(
        (response) => {
            toast.success(`${response.data.taskName} added successfully.`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return response.data
        }, (error) => {
            toast.error('Something went Wrong.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            console.log(error)
        }
    )
    return data;
}

const updateTask = async (taskId, taskName, status, startDate, endDate, project) => {
    const data = await axios.put(`${API_URL}/update/${taskId}`, { taskName, status, startDate, endDate, project }, { headers: AuthService.authHeader() }).then(
        (response) => {
            toast.success(`${response.data.taskName} updated successfully.`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return response.data;
        }, (error) => {
            toast.error('Something went Wrong.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
        }
    )
    return data;
}

const deleteTask = async (taskId) => {
    const data = await axios.delete(`${API_URL}/delete/${taskId}`, { headers: AuthService.authHeader() }).then(
        (response) => {
            toast.success(`${response.data.taskName} is deleted.`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return response.data
        }, (error) => {
            toast.error('Something went Wrong.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
        }
    )
    return data;
}

const validateTaskNameOfProject = async (projectName, taskName) => {
    const data = await axios.post(`${API_URL}/validate/task`, { projectName, taskName }, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data.message
        }, (error) => {
            return error.response.data.message
        }
    )
    return data
}

const validateProjectName = async (projectName) => {
    const data = await axios.post(`${API_URL}/validate/project`, { projectName }, { headers: AuthService.authHeader() }).then(
        (response) => {
            return response.data.message;
        }, (error) => {
            return error.response.data.message;
        }
    )
    return data
}

const DataService = {
    getProjects,
    getProject,
    getTasksOfProjectByStatus,
    getTasks,
    getTasksByStatus,
    getTasksByProjectId,
    addProject,
    addTask,
    updateTask,
    deleteTask,
    validateProjectName,
    validateTaskNameOfProject
}

export default DataService;