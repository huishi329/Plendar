import { useDispatch } from 'react-redux'
import { toggleCalendar } from '../../../store/calendars'
import styles from './CalendarItem.module.css'

export default function CalendarItem({ calendar }) {
    const dispatch = useDispatch()
    const handleCalendarVisibility = () => {
        dispatch(toggleCalendar(calendar.id))
    }

    return (
        <div className={styles.wrapper} onClick={handleCalendarVisibility}>
            <div className={styles.left}>
                <input
                    type="checkbox"
                    checked={calendar.is_displayed}
                    onChange={handleCalendarVisibility}
                >
                </input>
                <label htmlFor={calendar.name}>{calendar.name}</label>
            </div>
            <div className={styles.buttons}>
                <button>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <button>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    )
}
