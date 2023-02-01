import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CalendarOptionsDropdown.module.css'
import { colors } from './CalendarColors'

export default function CalendarOptionsDropdown({ calendar, user, setShowCalendarOptionsDropdown }) {
    const navigate = useNavigate();

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
                    <button key={color} className={styles.colorButton} style={{ backgroundColor: `${color}` }}></button>))}
            </div>
        </div>
    )
}
