import { useDispatch, useSelector } from "react-redux";
import { setMonth, setSideCalendarMonth, setSideCalendarYear, setYear } from "../../../store/sessionData";
import styles from './LeftNavbar.module.css';

export function LeftNavbar() {
    const dispatch = useDispatch();
    const year = useSelector(state => state.sessionData.year);
    const month = useSelector(state => state.sessionData.month);

    const backToToday = () => {
        const targetDate = new Date();
        const targetYear = targetDate.getFullYear();
        const targetMonth = targetDate.getMonth();
        dispatch(setMonth(targetMonth));
        dispatch(setYear(targetYear));
        dispatch(setSideCalendarMonth(targetMonth));
        dispatch(setSideCalendarYear(targetYear));
    }

    const nextMonth = () => {
        const date = new Date(year, month + 1)
        const newMonth = date.getMonth();
        const newYear = date.getFullYear();
        dispatch(setMonth(newMonth));
        dispatch(setYear(newYear));
        dispatch(setSideCalendarMonth(newMonth));
        dispatch(setSideCalendarYear(newYear));
    };

    const previousMonth = () => {
        const date = new Date(year, month - 1)
        dispatch(setYear(date.getFullYear()));
        dispatch(setMonth(date.getMonth()));
    };


    return (
        <div className={styles.wrapper}>
            <img src='/plendar.png' alt='plendar logo'></img>
            <div className={`${styles.largeText} ${styles.logo}`}>Plendar</div>
            <button className={styles.todayButton} onClick={backToToday}>
                Today
            </button>
            <button className={styles.monthButton} onClick={previousMonth}>
                <i className="fa-solid fa-angle-left"></i>
            </button>
            <button className={styles.monthButton} onClick={nextMonth}>
                <i className="fa-solid fa-angle-right"></i>
            </button>
            <div className={`${styles.largeText} ${styles.date}`}>{new Date(year, month).toLocaleDateString('en-US',
                { month: 'long', year: 'numeric' })}</div>
        </div>
    )
}
