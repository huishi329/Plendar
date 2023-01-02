import { useDispatch, useSelector } from "react-redux";
import styles from './LeftNavbar.module.css';

export function LeftNavbar() {
    const dispatch = useDispatch();
    const year = useSelector(state => state.sessionData.year);
    const month = useSelector(state => state.sessionData.month);
    return (
        <div className={styles.wrapper}>
            <img src='/plendar.png' alt='plendar logo'></img>
            <div className={`${styles.largeText} ${styles.logo}`}>Plendar</div>
            <i className="fa-solid fa-angle-left"></i>
            <i className="fa-solid fa-angle-right"></i>
            <div className={styles.largeText}>{new Date(year, month).toLocaleDateString('en-US',
                { month: 'long', year: 'numeric' })}</div>
        </div>
    )
}
