import { useDispatch } from 'react-redux'
import { toggleCalendar } from '../../../store/calendars'
import { setCurrentCalendar, setDeleteCalendarModal } from '../../../store/modals'
import styles from './CalendarItem.module.css'

export default function CalendarItem({ calendar }) {
    const dispatch = useDispatch();
    const handleVisibility = () => {
        dispatch(toggleCalendar(calendar.id))
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(setCurrentCalendar(calendar));
        dispatch(setDeleteCalendarModal(true));
    };

    return (
        <div className={styles.wrapper} onClick={handleVisibility}>
            <div className={styles.left}>
                <input
                    type="checkbox"
                    checked={calendar.is_displayed}
                    onChange={handleVisibility}
                >
                </input>
                <label htmlFor={calendar.name}>{calendar.name}</label>
            </div>
            <div className={styles.buttons}>
                <button onClick={handleDelete}>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <button>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    )
}
