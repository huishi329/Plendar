import styles from './MonthDay.module.css'

export default function MonthDay({ date, sideCalendarYear, sideCalendarMonth }) {
    const isClicked = false;
    const isCurrentMonth = date.getFullYear() === sideCalendarYear && date.getMonth() === sideCalendarMonth;
    const currentDate = new Date();
    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const isCurrentDate = currentDate.getTime() === date.getTime();
    const handleClick = () => {
    }

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
