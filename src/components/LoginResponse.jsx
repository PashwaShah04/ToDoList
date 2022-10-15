import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'
import Button from './Button'
import styles from './components-styles/LoginResponse.module.css'
import Input from './Input'

export default function LoginResponse() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        username: '',
        password: '',
        global: ''
    });

    useEffect(() => {
        let message = "";
        if (username) {
            let n = username.length;
            if (n < 3 || n > 24) {
                message = "Username must be between 3-24"
            }
            setError((previousItems) => ({ ...previousItems, username: message }));
        }
    }, [username])

    useEffect(() => {
        let message = "";
        if (password) {
            let n = password.length;
            if (n < 3 || n > 24) {
                message = "Password must be between 6-24"
            }
            setError((previousItems) => ({ ...previousItems, password: message }));
        }
    }, [password])

    const handleUsername = (event) => {
        let name = event.target.value;
        setUsername(name)
    }


    const handlePassword = (event) => {
        let password = event.target.value;
        setPassword(password)

    }

    const validate = () => {
        let isValidUserName = validateUserName();
        let isValidPassword = validatePassword();
        if (isValidUserName && isValidPassword && !error.username && !error.password) {
            AuthService.login(username, password).then(token => {
                token ? navigate("/todolist") : setError((prevItems) => ({ ...prevItems, global: "Invalid Credentials" }))
            })

        }
    }

    const validateUserName = () => {
        if (!username) {
            setError((prevItems) => ({ ...prevItems, username: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validatePassword = () => {
        if (!password) {
            setError((prevItems) => ({ ...prevItems, password: "Field is Required" }))
            return false;
        }
        return true;
    }

    return (
        <div className={styles.holder}>
            <h5>{error.global}</h5>
            <Input type="text"
                label="User Name"
                helper={error.username}
                value={username}
                onChange={handleUsername} />
            <Input type="password"
                label="Password"
                helper={error.password}
                value={password}
                onChange={handlePassword} />
            <Button text="Login" onClick={validate} />
        </div>
    )
}
