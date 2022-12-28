import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from 'moment';

import styles from './MonthView.module.css'
import DayTile from './DayTile/DayTile'
import DayOfWeek from './DayOfWeek/DayOfWeek';
import DayPlaceholder from "./DayPlaceholder/DayPlaceholder";
import { getEvents } from "../../store/events";

export default function MonthView() {
    const dispatch = useDispatch();
    const calendars = useSelector(state => state.calendars);
    const targetDate = new Date();
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    targetDate.setDate(1);
    const firstDayOfMonth = targetDate.getDay();
    const monthDaysNum = moment(targetDate.toLocaleDateString(
        'en-us',
        { year: "numeric", month: "numeric" }), "MM/YYYY").daysInMonth();

    useEffect(() => {
        if (calendars) {
            Object.values(calendars).forEach((calendar) => {
                if (calendar.is_displayed) dispatch(getEvents(calendar.id, year, month))
            })
        }
    }, [dispatch, month, year, calendars])

    return (
        <div className={styles.wrapper}>
            <DayOfWeek />
            <div className={styles.monthGrid}>
                {[...Array(firstDayOfMonth)].map((_, idx) => (<DayPlaceholder key={idx} />))}
                {[...Array(monthDaysNum)].map((_, idx) => {
                    return <DayTile date={new Date(year, month, idx + 1)} key={idx + 1} />
                })}
                {[...Array(35 - firstDayOfMonth - monthDaysNum)].map((_, idx) => (<DayPlaceholder key={idx} />))}
            </div>
        </div>
    )
}
