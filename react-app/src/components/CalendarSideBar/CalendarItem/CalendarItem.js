import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toggleCalendar } from '../../../store/calendars'
import { setCurrentCalendar, setDeleteCalendarModal } from '../../../store/modals'
import styles from './CalendarItem.module.css'

export default function CalendarItem({ calendar }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleVisibility = () => {
        dispatch(toggleCalendar(calendar.id));
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
                    readOnly
                >
                </input>
                <label htmlFor={calendar.name}>{calendar.name}</label>
            </div>
            <div className={styles.buttons}>
                {!calendar.is_default && <button onClick={handleDelete}>
                    <i className="fa-solid fa-xmark"></i>
                </button>}
                <button onClick={handleEdit} data-tooltip={`options for ${calendar.name}`} className={styles.option}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    )
}
