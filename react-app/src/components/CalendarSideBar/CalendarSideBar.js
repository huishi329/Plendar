import { useSelector } from 'react-redux';
import styles from './CalendarSideBar.module.css'
import MyCalendars from './MyCalendars/MyCalendars'
import SideCalendar from './SideCalendar/SideCalendar'

export default function CalendarSideBar() {
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.Wrapper}>
            <SideCalendar />
            {user && <MyCalendars />}
        </div>
    )
}
