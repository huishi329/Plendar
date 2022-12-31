import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEvent } from '../../../../store/modals';
import EventDetail from './EventDetail/EventDetail';
import styles from './EventItem.module.css'

export default function EventItem({ event }) {
    const eventRef = useRef();
    const dispatch = useDispatch();
    const modals = useSelector(state => state.modals)
    const showEventDetail = modals.event?.id === event.id &&
        modals.event?.start_time.getTime() === event.start_time.getTime();

    const [x, setX] = useState();
    const [y, setY] = useState();

    const handleEventClick = (e) => {
        e.stopPropagation();
        if (modals.date || modals.event || modals.showProfileDropdown) dispatch(setCurrentEvent(null));
        else dispatch(setCurrentEvent(event));
    };

    useEffect(() => {
        setX(eventRef.current.offsetLeft - eventRef.current.offsetWidth);
        setY(eventRef.current.offsetTop + eventRef.current.offsetHeight);
    }, [])

    return (
        <>
            <div className={styles.wrapper} ref={eventRef} onClick={handleEventClick}>
                <div className={styles.title}>
                    <div className={styles.dot}>
                        <i className="fa-solid fa-circle"></i>
                    </div>
                    {`${new Date(event.start_time).toLocaleTimeString(
                        'en-US',
                        { hour: '2-digit', minute: '2-digit' })
                        .toLowerCase()
                        .split(" ")
                        .join("")} ${event.title}`}
                </div>
            </div>
            {showEventDetail &&
                <EventDetail event={event} x={x} y={y} />}
        </>
    )
}
