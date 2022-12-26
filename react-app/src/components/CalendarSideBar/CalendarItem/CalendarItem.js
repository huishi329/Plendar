import { useDispatch } from 'react-redux'
import { toggleCalendar } from '../../../store/calendars'
import styles from './CalendarItem.module.css'

export default function CalendarItem({ calendar }) {
    const dispatch = useDispatch()
    const handleCalendarVisibility = () => {
        dispatch(toggleCalendar(calendar.id))
    }

    return (
        <div className={styles.wrapper}>
            <input
                type="checkbox"
                checked={calendar.is_displayed}
                onChange={() => handleCalendarVisibility()}
            >
            </input>
            <label htmlFor={calendar.name}>{calendar.name}</label>
        </div>
    )
}
