import { useSelector } from 'react-redux'
import styles from './DayTile.module.css'
import EventItem from './EventItem/EventItem';

export default function DayTile({ date }) {
    const events = useSelector(state => Object.values(state.events));
    // filter to get the events for the date
    const day_events = events?.filter(event =>
        new Date(event.start_time).getDate() === date.getDate() ||
        (event.recurrence === 1 && date.getDate() >= new Date(event.start_time).getDate()))
    // Make a shallow copy and set date to the DayTile date
    const day_events_sorted = [...day_events]?.sort((a, b) => {
        a.start_time = new Date(a.start_time)
        a.start_time.setDate(date.getDate())
        b.start_time = new Date(b.start_time)
        b.start_time.setDate(date.getDate())
        return a.start_time - b.start_time
        // new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    })

    return (
        <div className={styles.wrapper}>
            <div className={styles.dayName}>{date.getDate()}</div>
            {day_events_sorted && day_events_sorted.map(event =>
                (<EventItem event={event} key={event.id} />))}
        </div>
    )
}
