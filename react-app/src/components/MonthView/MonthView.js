import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from 'moment';

import styles from './MonthView.module.css'
import DayTile from './DayTile/DayTile'
import DayOfWeek from './DayOfWeek/DayOfWeek';
import { getEvents } from "../../store/events";


export default function MonthView() {
    const dispatch = useDispatch()
    const targetDate = new Date()
    const year = targetDate.getFullYear()
    const month = targetDate.getMonth()
    targetDate.setDate(1);
    console.log(year);
    // const firstDayOfMonth = targetDate.getDay();
    const monthDaysNum = moment(targetDate.toLocaleDateString(
        'en-us',
        { year: "numeric", month: "numeric" }), "MM/YYYY").daysInMonth();
    console.log(moment().days());

    useEffect(() => {
        dispatch(getEvents(1, year, month))
    }, [dispatch, month, year])

    return (
        <div className={styles.wrapper}>
            <DayOfWeek />
            <div className={styles.monthGrid}>
                {[...Array(monthDaysNum)].map((_, idx) => {
                    return <DayTile date={new Date(year, month, idx + 1)} key={idx + 1} />
                })
                }
            </div>
        </div>
    )
}
