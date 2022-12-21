import styles from "./ProfileDropdown.module.css";
import { useDispatch } from 'react-redux';
import { signOut } from '../../../store/session';
import { useEffect } from "react";

export default function ProfileDropdown({ user, setShowDropdown }) {
    const dispatch = useDispatch();
    const onClickSignOut = () => {
        dispatch(signOut());
        setShowDropdown(false);
    };
    useEffect(() => {
        const closeDropdown = () => setShowDropdown(false);
        document.addEventListener('click', closeDropdown)
        return () => document.removeEventListener('click', closeDropdown)
    }, [setShowDropdown])


    return <>
        <div className={styles.wrapper}>

            <div className={styles.row}>
                <div className={styles.right}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                </div>
            </div>

            <div className={`${styles.row} ${styles.signOut}`} onClick={onClickSignOut}>
                <div className={`${styles.right}`}>Sign out</div>
            </div>
        </div>
    </>;
}
