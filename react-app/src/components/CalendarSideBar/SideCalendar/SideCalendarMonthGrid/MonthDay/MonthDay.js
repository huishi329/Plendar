import { useDispatch, useSelector } from 'react-redux';
import { setMonth, setSideCalendarDate, setSideCalendarMonth, setSideCalendarYear, setYear } from '../../../../../store/sessionData';
import styles from './MonthDay.module.css'

export default function MonthDay({ date, sideCalendarYear, sideCalendarMonth }) {
    const dispatch = useDispatch();
    const mainCalendarMonth = useSelector(state => state.sessionData.month);
    const mainCalendarYear = useSelector(state => state.sessionData.year);
    const sideCalendarDate = useSelector(state => state.sessionData.sideCalendarDate);
    const isCurrentMonth = date.getFullYear() === sideCalendarYear && date.getMonth() === sideCalendarMonth;
    const currentDate = new Date();
    date.setHours(23, 59, 59, 59);
    currentDate.setHours(23, 59, 59, 59);
    const isCurrentDate = currentDate.getTime() === date.getTime();
    const isClicked = sideCalendarDate?.getTime() === date.getTime();

    const handleClick = () => {
        dispatch(setSideCalendarDate(date));
        const clickedMonth = date.getMonth();
        const clickedYear = date.getFullYear();
        const isSyncWithMainCalendar = clickedYear === mainCalendarYear && clickedYear === mainCalendarMonth;

        if (!isSyncWithMainCalendar) {
            dispatch(setMonth(clickedMonth));
            dispatch(setYear(clickedYear));
            dispatch(setSideCalendarMonth(clickedMonth));
            dispatch(setSideCalendarYear(clickedYear));
        }
    };

    return (
        <div className={`
        ${styles.wrapper}
        ${isClicked && styles.clicked}
        ${isCurrentMonth && styles.currentMonth}
        ${isCurrentDate && styles.currentDate}
        `} onClick={handleClick}>
            {`${date.getDate()} `}
        </div>
    )
}
