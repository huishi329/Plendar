import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import styles from './MonthView.module.css'
import DayTile from './DayTile/DayTile'
import DayOfWeek from './DayOfWeek/DayOfWeek';
import { getEvents } from "../../store/events";

export default function MonthView() {
    const dispatch = useDispatch();
    const calendars = useSelector(state => state.calendars);
    const year = useSelector(state => state.sessionData.year);
    const month = useSelector(state => state.sessionData.month);
    const firstDateOfMonth = new Date(year, month);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    const handleWheel = (e) => {
        console.log(e.currentTarget);
        console.log(e.deltaY);
    }

    useEffect(() => {
        if (calendars) {
            Object.values(calendars).forEach((calendar) => {
                if (calendar.is_displayed) dispatch(getEvents(calendar.id, year, month))
            })
        }
    }, [dispatch, month, year, calendars])

    return (
        <div className={styles.wrapper} onWheel={handleWheel}>
            <DayOfWeek />
            <div className={styles.monthGrid}>
                {[...Array(35)].map((_, idx) => {
                    return <DayTile date={new Date(year, month, idx - firstDayOfMonth + 1)} key={idx + 1} />
                })}
            </div>
        </div>
    )
}
