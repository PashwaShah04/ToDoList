import React, { useState, useEffect, useContext } from 'react'
import Input from '../components/Input'
import styles from './modal-style/ProfileEditModal.module.css'
import AuthService from '../services/auth.service';

export default function ProfileEditModal({ save, click, isActive }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [passwordToggle, setPasswordToggle] = useState(false)
    const [newPasswordToggle, setNewPasswordToggle] = useState(false)

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        username: '',
        newPassword: ''
    });

    const user = AuthService.getUser();

    useEffect(() => {
        setFirstName(user.fname);
        setLastName(user.lname);
        setUsername(user.username)
    }, [])

    useEffect(() => {
        setError((previousItems) => ({ ...previousItems, firstName: "" }));
    }, [firstName])

    useEffect(() => {
        setError((previousItems) => ({ ...previousItems, lastName: "" }));
    }, [lastName])

    useEffect(() => {
        let message = "";
        if (username) {
            let n = username.length;
            if (n < 3 || n > 24) {
                message = "Username must be between 3-24"
            } else if (user.username !== username) {
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


    useEffect(() => {
        let message = "";
        if (newPassword) {
            let n = newPassword.length;
            if (n < 6 || n > 24) {
                message = "Password must be between 6-24"
            }
            setError((previousItems) => ({ ...previousItems, newPassword: message }));
        }
    }, [newPassword])


    const validate = () => {
        let isValidFirstName = validateFirstName();
        let isValidLastName = validateLastName();
        let isValidUsername = validateUsername();
        let isValidPassword = validatePassword();
        console.log(isValidPassword);
        if (isValidFirstName && isValidLastName && isValidUsername && isValidPassword &&
            !error.firstName && !error.lastName && !error.username && !error.newPassword && !error.password) {
            save(password, firstName, lastName, username, newPassword);
            clearState();
            setState();
        }
        return;
    }

    const setState = () => {
        user = AuthService.getUser();
        setFirstName(user.fname);
        setLastName(user.lname);
        setUsername(user.username)
    }

    const clearState = () => {
        setPassword("")
        setNewPassword("")
        setError({
            firstName: '',
            lastName: '',
            username: '',
            newPassword: ''
        })
    }

    const validateFirstName = () => {
        if (!firstName) {
            setError((prevItems) => ({ ...prevItems, firstName: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateLastName = () => {
        if (!lastName) {
            setError((prevItems) => ({ ...prevItems, lastName: "Field is Required" }))
            return false;
        }
        return true;
    }

    const validateUsername = () => {
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

    const handleFirstName = (event) => {
        let firstName = event.target.value;
        setFirstName(firstName)
    }

    const handleLastName = (event) => {
        let lastName = event.target.value;
        setLastName(lastName)
    }

    const handleUsername = (event) => {
        let name = event.target.value;
        setUsername(name)
    }

    const handlePassword = (event) => {
        let password = event.target.value;
        setPassword(password)
    }

    const handleNewPassword = (event) => {
        let password = event.target.value;
        setNewPassword(password)
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
                    <Input label="First Name"
                        type="text"
                        value={firstName}
                        onChange={handleFirstName}
                        helper={error.firstName} />

                    <Input label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={handleLastName}
                        helper={error.lastName} />

                    <Input label="User Name"
                        type="text"
                        value={username}
                        onChange={handleUsername}
                        helper={error.username} />

                    <Input label="Existing Password"
                        type={passwordToggle ? "text" : "password"}
                        value={password}
                        onChange={handlePassword}
                        helper={error.password} />

                    <input type="checkbox" onClick={() => setPasswordToggle(prev => !prev)} />Show Password

                    <Input label="New Password"
                        type={newPasswordToggle ? "text" : "password"}
                        value={newPassword}
                        onChange={handleNewPassword}
                        helper={error.newPassword} />

                    <input style={{ color: "#f16249" }} type="checkbox" onClick={() => setNewPasswordToggle(prev => !prev)} />Show Password

                </div>
                <div className={styles.modal__footer}>
                    <button className={styles.save} onClick={() => {
                        if (user.username !== username || user.fname !== firstName || user.lname !== lastName) {
                            validate();
                        } else {
                            click();
                        }
                    }
                    }>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
