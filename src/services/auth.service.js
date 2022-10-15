import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:8080/api/auth"

const login = async (username, password) => {
    const data = await axios.post(`${API_URL}/login`, { username, password }).then(
        (response) => {
            localStorage.setItem("user", JSON.stringify(response.data))
            toast.info(`Welcome ${response.data.fname} ${response.data.lname}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return true;
        },
        (error) => {
            toast.error(`Invalid Credentials`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
    )

    return data;

}

const validateUsername = async (name) => {
    const data = await axios.get(`${API_URL}/signup/validate/${name}`).then(
        (response) => {
            return response.data.message;
        },
        (error) => {
            return error.response.data.message;
        }
    );
    return data;
}

const signup = async (userName, password, fname, lname) => {
    const isAdmin = false;
    const data = await axios.post(`${API_URL}/signup`, { userName, password, fname, lname, isAdmin }).then(
        (response) => {
            toast.success('User successfully registered.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return response.data.message === "User Registered";
        },
        (error) => {
            toast.error('Something went Wrong!.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return error.response.data.message === "Username is taken";
        }
    );
    return data;
}

const getUserName = () => {
    const { fname, lname } = JSON.parse(localStorage.getItem("user"));
    return `${fname} ${lname}`;
}

const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}

const logout = () => {
    if (localStorage.getItem("user")) {
        toast.info('Logged out.', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        localStorage.removeItem("user");
        return true
    }
    return false
}

const updateUser = async (password, fname, lname, username, newPassword) => {
    const userId = getUser().id;
    const user = getUser().username === username ? username : getUser().username;
    return await axios.put(`${API_URL}/update`, { userId, user, password, fname, lname, username, newPassword })
}

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const AuthService = {
    validateUsername, login, signup, getUserName, getUser, logout, updateUser, authHeader
};

export default AuthService;