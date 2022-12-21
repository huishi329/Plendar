import styles from "./ProfileDropdown.module.css";
import { useDispatch } from 'react-redux';
import { signOut } from '../../../store/session';

export default function ProfileDropdown({ user, setShowDropdown }) {
    const dispatch = useDispatch();

    const onClickSignOut = () => {
        dispatch(signOut());
        setShowDropdown(false);
    };

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
