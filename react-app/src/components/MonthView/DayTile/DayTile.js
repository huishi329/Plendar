import { useSelector } from 'react-redux'
import styles from './DayTile.module.css'
import EventItem from './EventItem/EventItem';

export default function DayTile({ date }) {
    const user = useSelector(state => state.session.user)
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
    // Make a deep copy and set date to the DayTile date
    const day_events_sorted = JSON.parse(JSON.stringify(day_events)).sort((a, b) => {
        a.start_time = new Date(a.start_time)
        a.start_time.setDate(date.getDate())
        b.start_time = new Date(b.start_time)
        b.start_time.setDate(date.getDate())
        return a.start_time - b.start_time
    })
    // if (!user || !events.length) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.dayName}>{date.getDate()}</div>
            {day_events_sorted && day_events_sorted.map(event =>
                (<EventItem event={event} key={event.id} />))}
        </div>
    )
}
