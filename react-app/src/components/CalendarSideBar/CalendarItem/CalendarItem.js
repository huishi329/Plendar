import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toggleCalendar } from '../../../store/calendars'
import { setCurrentCalendar, setDeleteCalendarModal } from '../../../store/modals'
import styles from './CalendarItem.module.css'
import CalendarOptionsDropdown from './CalendarOptionsDropdown/CalendarOptionsDropdown';

export default function CalendarItem({ calendar, user }) {
    const dispatch = useDispatch();
    const [showCalendarOptionsDropdown, setShowCalendarOptionsDropdown] = useState(false);
    const handleVisibility = () => {
        dispatch(toggleCalendar(calendar.id));
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
                    readOnly
                    style={{ accentColor: `${calendar.color}` }}
                >
                </input>
                <label htmlFor={calendar.name}>{calendar.name}</label>
            </div>
            <div className={styles.buttons}>
                {!calendar.is_default && <button onClick={handleDelete}>
                    <i className="fa-solid fa-xmark"></i>
                </button>}
                <button
                    className={styles.option}
                    onClick={() => setShowCalendarOptionsDropdown(true)}
                    data-tooltip={`options for ${calendar.name}`}
                >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
            {showCalendarOptionsDropdown && <CalendarOptionsDropdown calendar={calendar} user={user} />}
        </div>
    )
}
