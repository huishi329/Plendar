import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import styles from './MonthView.module.css'
import DayTile from './DayTile/DayTile'
import DayOfWeek from './DayOfWeek/DayOfWeek';
import { getEvents, getEventsInvited } from "../../store/events";
import { setMonth, setYear, setSideCalendarMonth, setSideCalendarYear } from "../../store/sessionData";

export default function MonthView() {
    const dispatch = useDispatch();
    const calendars = useSelector(state => state.calendars);
    const year = useSelector(state => state.sessionData.year);
    const month = useSelector(state => state.sessionData.month);
    const firstDateOfMonth = new Date(year, month);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    const handleWheel = (e) => {
        const path = e.nativeEvent?.composedPath();
        if (path) {
            for (const ele of path) {
                // if DayTile or EventDetail are in the path of scroll event and they have scrollbar, then don't trigger the month change
                if (ele?.className?.includes('DayTile') || ele?.className?.includes('EventDetail')) {
                    if (ele.scrollHeight > ele.clientHeight) return;
                }
            }
        }

        if (e.deltaY > 0) {
            if (month === 11) {
                dispatch(setYear(year + 1));
                dispatch(setMonth(0));
                dispatch(setSideCalendarYear(year + 1));
                dispatch(setSideCalendarMonth(0));
            } else {
                dispatch(setMonth(month + 1));
                dispatch(setSideCalendarMonth(month + 1));
            }
        } else {
            if (month === 0) {
                dispatch(setYear(year - 1));
                dispatch(setMonth(11));
                dispatch(setSideCalendarYear(year - 1));
                dispatch(setSideCalendarMonth(11));
            } else {
                dispatch(setMonth(month - 1));
                dispatch(setSideCalendarMonth(month - 1));
            }
        }
    }

    useEffect(() => {
        if (calendars) {
            Object.values(calendars).forEach((calendar) => {
                if (calendar.is_displayed) {
                    dispatch(getEvents(calendar.id, year, month));
                    if (calendar.is_default) dispatch(getEventsInvited());
                }
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
