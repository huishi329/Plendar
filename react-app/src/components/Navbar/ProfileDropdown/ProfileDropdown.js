import styles from "./ProfileDropdown.module.css";
import { useDispatch } from 'react-redux';
import { signOut } from '../../../store/session';
import { useEffect, useRef } from "react";
import { clearEvents } from "../../../store/events";
import { clearCalendars } from "../../../store/calendars";

export default function ProfileDropdown({ user, setShowDropdown }) {
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const onClickSignOut = () => {
        dispatch(signOut())
            .then(() => {
                dispatch(clearEvents());
                dispatch(clearCalendars());
            })
        setShowDropdown(false);
    };
    useEffect(() => {
        const closeDropdown = (e) => {
            console.log(e);
            if (e.path.find(ele => ele === dropdownRef.current)) return;
            setShowDropdown(false);
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown)
    }, [setShowDropdown])


    return <>
        <div className={styles.wrapper} ref={dropdownRef}>
            <div className={styles.profileImage}>
                <img src={user.profile_picture_url} alt={user.name}></img>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
            </div>
            <div>

            </div>
            <div className={styles.signOut}>
                <div className={styles.signOutBtn} onClick={onClickSignOut}>Sign out</div>
            </div>
        </div>
    </>;
}
