import { useDispatch, useSelector } from 'react-redux';
import { setMonth, setSideCalendarDate, setSideCalendarMonth, setSideCalendarYear, setYear } from '../../../../../store/sessionData';
import styles from './MonthDay.module.css'

export default function MonthDay({ date, sideCalendarYear, sideCalendarMonth }) {
    const dispatch = useDispatch();
    const sideCalendarDate = useSelector(state => state.sessionData.sideCalendarDate);
    const isCurrentMonth = date.getFullYear() === sideCalendarYear && date.getMonth() === sideCalendarMonth;
    const currentDate = new Date();
    date.setHours(23, 59, 59, 59);
    currentDate.setHours(23, 59, 59, 59);
    const isCurrentDate = currentDate.getTime() === date.getTime();
    const isClicked = sideCalendarDate?.getTime() === date.getTime();

    const handleClick = () => {
        dispatch(setSideCalendarDate(date));
        if (!isCurrentMonth) {
            const newMonth = date.getMonth();
            const newYear = date.getFullYear();
            dispatch(setMonth(newMonth));
            dispatch(setYear(newYear));
            dispatch(setSideCalendarMonth(newMonth));
            dispatch(setSideCalendarYear(newYear));
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
