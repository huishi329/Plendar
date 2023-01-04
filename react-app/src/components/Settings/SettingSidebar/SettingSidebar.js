import styles from './SettingSidebar.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SettingSidebar() {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const calendars = Object.values(JSON.parse(window.localStorage.getItem('plendar')));
    console.log(typeof path, path.includes('createcalendar'));
    return (
        <div className={styles.wrapper}>
            <div className={styles.addCalendar}>
                <div className={styles.category}>Add calendar</div>
                <button className={`${styles.button} ${path.includes('createcalendar') ? styles.highlighted : ''}`}
                    onClick={() => navigate('/settings/createcalendar')}
                >Create new calendar</button>
            </div>
            <div className={styles.myCalendar}>
                <div className={styles.category}>Settings for my calendars</div>
                {calendars.map(calendar => (<button className={`${styles.button} ${path.includes(`calendars/${calendar.id}`) ? styles.highlighted : ''}`}
                    key={calendar.id}>{calendar.name}</button>))}
            </div>
        </div>
    )
}
