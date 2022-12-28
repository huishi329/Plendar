import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEvent } from '../../../../../store/modals';
import styles from './EventDetail.module.css'
import EventNavbar from './EventNavbar/EventNavbar';

export default function EventDetail({ event, x, y }) {
    const eventRef = useRef();
    const dispatch = useDispatch();
    const calendars = useSelector(state => state.calendars);

    useEffect(() => {
        const closeEventDetail = (e) => {
            e.stopPropagation();
            if (e.path.find(ele => ele === eventRef.current)) return;
            dispatch(setCurrentEvent(null))
        };
        document.addEventListener('click', closeEventDetail);
        return () => document.removeEventListener('click', closeEventDetail)
    }, [dispatch])

    if (!calendars) return null;

    return (
        <div className={styles.wrapper} style={{ top: y }} ref={eventRef}>
            <EventNavbar event={event} calendar={calendars[event.calendar_id]} />
            <div className={styles.title}>
                <i className="fa-solid fa-square"></i>
                {event.title}
            </div>
            <div className={styles.datetime}>
                {event.start_time.toLocaleDateString('en-US',
                    { weekday: 'long', day: '2-digit', month: 'long' })
                }
                <i class="fa-solid fa-circle"></i>
                {event.start_time.toLocaleTimeString('en-US',
                    { hour: '2-digit', minute: '2-digit' }).toLowerCase().split(" ").join("")}
                {` - `}
                {event.end_time.toLocaleTimeString('en-US',
                    { hour: '2-digit', minute: '2-digit' }).toLowerCase().split(" ").join("")}
            </div>
            {event.address && <div className={styles.address}>
                <i className="fa-solid fa-location-dot"></i>
                {event.address}
            </div>}
            {event.description && <div className={styles.description}>
                <i className="fa-solid fa-bars"></i>
                {event.description}
            </div>}
            {calendars && <div>
                <i class="fa-regular fa-calendar"></i>
                {calendars[event.calendar_id].name}
            </div>}
        </div >
    )
}
