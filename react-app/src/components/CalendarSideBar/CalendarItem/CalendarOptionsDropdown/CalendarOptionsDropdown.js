import { useNavigate } from 'react-router-dom';
import styles from './CalendarOptionsDropdown.module.css'

export default function CalendarOptionsDropdown({ calendar, user }) {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`settings/calendar/${calendar.id}`)
    }
    return (

        <div className={styles.wrapper}>
            {calendar.owner_id === user.id &&
                <div className={styles} onClick={handleEdit}>Settings</div>}
            <div className={styles.colors}></div>
        </div>
    )
}
