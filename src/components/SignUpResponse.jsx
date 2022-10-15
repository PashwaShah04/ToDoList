import React, { useEffect, useState } from 'react'
import styles from './components-styles/SignUpResponse.module.css'
import Input from './Input'
import Button from './Button'
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignUpResponse() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        global: ''
    });

    useEffect(() => {
        setError((prevItems) => ({ ...prevItems, firstName: "" }))
    }, [firstName]);

    useEffect(() => {
        setError((prevItems) => ({ ...prevItems, lastName: "" }))
    }, [lastName]);

    useEffect(() => {
        let message = "";
        if (username) {
            let n = username.length;
            if (n < 3 || n > 24) {
                message = "Username must be between 3-24"
            } else {
                AuthService.validateUsername(username).then(msg => {
                    setError((previousItems) => ({ ...previousItems, username: msg }));
                });
            }

            setError((previousItems) => ({ ...previousItems, username: message }));
        }
    }, [username])

    useEffect(() => {
        let message = "";
        if (password) {
            let n = password.length;
            if (n < 6 || n > 24) {
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

    const handleFirstName = (event) => {
        let firstName = event.target.value;
        setFirstName(firstName)
    }

    const handleLastName = (event) => {
        let lastName = event.target.value;
        setLastName(lastName)
    }

    const validate = () => {
        let isValidFirstName = validateFirstName();
        let isValidLastName = validateLastName();
        let isValidUserName = validateUserName();
        let isValidPassword = validatePassword();
        if (isValidFirstName && isValidLastName && isValidUserName && isValidPassword) {
            AuthService.signup(username, password, firstName, lastName).then(token => {
                token ? navigate("/login") : setError(prevItems => ({ ...prevItems, global: "Something went Wrong" }))
            })
        }
    }

    const validateFirstName = () => {
        if (error.firstName) {
            return false;
        }
        if (!firstName) {
            setError((prevItems) => ({ ...prevItems, firstName: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateLastName = () => {
        if (error.lastName) {
            return false;
        }
        if (!lastName) {
            setError((prevItems) => ({ ...prevItems, lastName: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateUserName = () => {
        if (error.username) {
            return false;
        }
        if (!username) {
            setError((prevItems) => ({ ...prevItems, username: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validatePassword = () => {
        if (error.password) {
            return false;
        }
        if (!password) {
            setError((prevItems) => ({ ...prevItems, password: "Field is Required" }))
            return false;
        }
        return true;
    }

    return (
        <div className={styles.holder}>
            <h5>{error.global}</h5>
            <Input type="text" label="First Name" helper={error.firstName} value={firstName}
                onChange={handleFirstName} />
            <Input type="text" label="Last Name" helper={error.lastName} value={lastName}
                onChange={handleLastName} />
            <Input type="text" label="User Name" helper={error.username} value={username}
                onChange={handleUsername} />
            <Input type="password" label="Password" helper={error.password} value={password}
                onChange={handlePassword} />
            <Button text="Sign Up" onClick={validate} />
        </div>
    )
}
