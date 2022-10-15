import React, { useEffect, useState } from 'react'
import styles from './components-styles/UserName.module.css'
import '../index.module.css';
import { CgProfile, CgLogOut } from 'react-icons/cg'
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ProfileEditModal from '../modal/ProfileEditModal';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UserName() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isEditProfile, setEditProfile] = useState(false);

    useEffect(() => {
        setUsername(AuthService.getUserName());
    }, [])

    const handleProfileClick = () => {
        setEditProfile(prev => !prev);
    }

    const handleSaveProfileClick = (password, firstName, lastName, username, newPassword) => {
        AuthService.updateUser(password, firstName, lastName, username, newPassword).then(
            (response) => {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data))
                toast.info(`Profile update successfully`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUsername(AuthService.getUserName());
                setEditProfile(prev => !prev)
            }, (error) => {
                console.log(error.response);
                toast.error(`Invalid Credentials`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        )

    }

    const logout = () => {
        if (AuthService.logout()) {
            navigate("/login");
        }
    }
    return (
        <div className={styles.details}>
            <Header />
            <div className={styles.username}>
                <span className={styles.username__text}>
                    {username}
                    <ul className={styles.dropdown__menu}>
                        <li onClick={handleProfileClick}>
                            <CgProfile className={styles.dropdown__menu__icon} />
                            <span className={styles.dropdown__menu__text}>Profile</span>
                        </li>
                        <li onClick={logout}>
                            <CgLogOut className={styles.dropdown__menu__icon} />
                            <span className={styles.dropdown__menu__text}>Logout</span>
                        </li>
                    </ul>
                </span>
                <i className={`${styles.arrow} ${styles.down}`}></i>
            </div>
            <ProfileEditModal save={handleSaveProfileClick} click={handleProfileClick} isActive={isEditProfile} />
        </div>
    )
}
