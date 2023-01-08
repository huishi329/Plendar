import MonthDay from "./MonthDay/MonthDay";
import styles from './SideCalendarMonthGrid.module.css'

export default function SideCalendarMonthView({ year, month }) {
    const firstDateOfMonth = new Date(year, month);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    return (
        <div className={styles.wrapper}>
            <div className={styles.monthGrid}>
                {[...Array(42)].map((_, idx) => {
                    return <MonthDay
                        date={new Date(year, month, idx - firstDayOfMonth + 1)}
                        sideCalendarYear={year}
                        sideCalendarMonth={month}
                        key={idx + 1} />
                })}
            </div>
        </div>
    )
}
