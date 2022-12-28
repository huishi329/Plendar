import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import styles from './DayTile.module.css'
import EventItem from './EventItem/EventItem';

export default function DayTile({ date }) {
    const tileRef = useRef();
    const [x, setX] = useState();
    const [y, setY] = useState();

    const events = useSelector(state => Object.values(state.events));
    // filter to get the events for the date
    const day_events = events?.filter(event => {
        // envents that doesn't repeat
        const eventDate = new Date(event.start_time);
        return (eventDate.getDate() === date.getDate() ||
            // events that repeat daily
            (event.recurrence === 1 && date.getDate() >= eventDate.getDate()) ||
            // events that repeat weekly
            (event.recurrence === 7 && date.getDate() >= eventDate.getDate() && date.getDay() === eventDate.getDay()))
    })
    // Make a deep copy and then set date to the DayTile date
    const day_events_copy = JSON.parse(JSON.stringify(day_events))
    day_events_copy.forEach((event) => {
        event.start_time = new Date(event.start_time);
        event.start_time.setDate(date.getDate());
        event.end_time = new Date(event.end_time);
        event.end_time.setDate(date.getDate());
    })

    const day_events_sorted = day_events_copy.sort((a, b) => {
        return a.start_time - b.start_time
    })

    useEffect(() => {
        setX(tileRef.current.offsetLeft);
        setY(tileRef.current.offsetTop);
    }, [])

    return (
        <div className={styles.wrapper} ref={tileRef}>
            <div className={styles.dayName}>{date.getDate()}</div>
            {day_events_sorted && day_events_sorted.map(event =>
                (<EventItem event={event} key={event.id} />))}
        </div>
    )
}
