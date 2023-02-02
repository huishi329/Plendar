import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './CalendarOptionsDropdown.module.css'
import { colors } from './CalendarColors'
import { changeCalendarColor } from '../../../../store/calendars';

export default function CalendarOptionsDropdown({ calendar, user, setShowCalendarOptionsDropdown }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const closeDropdown = () => setShowCalendarOptionsDropdown(false);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown)
    }, [setShowCalendarOptionsDropdown])

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`settings/calendar/${calendar.id}`)
    }
    return (

        <div className={styles.wrapper}>
            {calendar.owner_id === user.id &&
                <div className={styles.settings} onClick={handleEdit}>Settings</div>}
            <div className={styles.colors}>
                {colors.map(color => (
                    <div className={styles.colorDiv}>
                        <button
                            key={color}
                            className={styles.colorButton}
                            style={{ backgroundColor: `${color}` }}
                            onClick={() => dispatch(changeCalendarColor(calendar.id, color))}></button>
                    </div>
                ))}
            </div>
        </div>
    )
}
