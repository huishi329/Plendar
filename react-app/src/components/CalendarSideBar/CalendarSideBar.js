import styles from './CalendarSideBar.module.css'
import MyCalendars from './MyCalendars/MyCalendars'


export default function CalendarSideBar() {

    return (
        <div className={styles.Wrapper}>
            <MyCalendars />
        </div>
    )
}
