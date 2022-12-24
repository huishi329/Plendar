import styles from './CalendarItem.module.css'

export default function CalendarItem({ calendar }) {
    const handleCalendarVisibility = (calendar_id) => {
        return;
    }

    return (
        <div className={styles.wrapper}>
            <input
                type="checkbox"
                checked={calendar.is_active}
                onChange={() => handleCalendarVisibility(calendar.id)}
            >
            </input>
            <label htmlFor={calendar.name}>{calendar.name}</label>
        </div>
    )
}
