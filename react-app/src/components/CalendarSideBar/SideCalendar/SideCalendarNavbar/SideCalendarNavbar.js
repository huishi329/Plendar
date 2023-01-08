import styles from './SideCalendarNavbar.module.css'
import { useDispatch } from "react-redux";
import { setSideCalendarMonth, setSideCalendarYear } from "../../../../store/sessionData";


export default function SideCalendarNavbar({ year, month }) {
    const dispatch = useDispatch();


    const nextMonth = () => {
        const date = new Date(year, month + 1)
        dispatch(setSideCalendarYear(date.getFullYear()));
        dispatch(setSideCalendarMonth(date.getMonth()));
    };

    const previousMonth = () => {
        const date = new Date(year, month - 1)
        dispatch(setSideCalendarYear(date.getFullYear()));
        dispatch(setSideCalendarMonth(date.getMonth()));
    };

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.date}>{new Date(year, month).toLocaleDateString('en-US',
                    { month: 'long', year: 'numeric' })}</div>
                <button className={styles.monthButton} onClick={previousMonth}>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button className={styles.monthButton} onClick={nextMonth}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>

        </div>
    )
}
