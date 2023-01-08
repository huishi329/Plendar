import styles from './SideCalendar.module.css'
import { useSelector } from "react-redux";
import SideCalendarNavbar from './SideCalendarNavbar/SideCalendarNavbar'
import SideCalendarMonthGrid from './SideCalendarMonthGrid/SideCalendarMonthGrid';
import ShortDayOfWeek from './ShortDayOfWeek/ShortDayOfWeek';

export default function SideCalendar() {
    const year = useSelector(state => state.sessionData.sideCalendarYear);
    const month = useSelector(state => state.sessionData.sideCalendarMonth);

    return (
        <div className={styles.wrapper}>
            <SideCalendarNavbar year={year} month={month} />
            <ShortDayOfWeek />
            <SideCalendarMonthGrid year={year} month={month} />
        </div>
    )
}
