import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toggleCalendar } from '../../../store/calendars'
import { setCurrentCalendar, setDeleteCalendarModal } from '../../../store/modals'
import styles from './CalendarItem.module.css'

export default function CalendarItem({ calendar }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleVisibility = () => {
        dispatch(toggleCalendar(calendar.id))
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(setCurrentCalendar(calendar));
        dispatch(setDeleteCalendarModal(true));
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`settings/calendar/${calendar.id}`)
    }

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
                <button data-tooltip={`Unsubscribe from ${calendar.name}`} onClick={handleDelete}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <button data-tooltip={`options for ${calendar.name}`} onClick={handleEdit}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    )
}
