import CalendarSideBar from "../CalendarSideBar/CalendarSideBar"
import MonthView from "../MonthView/MonthView"
import styles from './MainView.module.css'

export default function MainView() {
    return (
        <div className={styles.MainViewWrapper}>
            <CalendarSideBar />
            <MonthView />
        </div>
    )
}
