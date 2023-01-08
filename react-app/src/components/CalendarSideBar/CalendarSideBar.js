import styles from './CalendarSideBar.module.css'
import MyCalendars from './MyCalendars/MyCalendars'
import SideCalendar from './SideCalendar/SideCalendar'

export default function CalendarSideBar() {

    return (
        <div className={styles.Wrapper}>
            <SideCalendar />
            <MyCalendars />
        </div>
    )
}
