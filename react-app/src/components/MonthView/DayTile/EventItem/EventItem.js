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

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [eventItemWidth, setEventItemWidth] = useState(0);

    const handleEventClick = (e) => {
        e.stopPropagation();
        if (modals.date || modals.showProfileDropdown) dispatch(setCurrentEvent(null));
        else dispatch(setCurrentEvent(event));
    };

    useEffect(() => {
        if (windowWidth < 800) setX((windowWidth - 400) / 2)
        else if (eventRef.current.offsetLeft > (windowWidth / 2)) setX(eventRef.current.offsetLeft - 400)
        else setX(eventRef.current.offsetLeft + (eventItemWidth || eventRef.current.offsetWidth));

        // setY to undefined so that the EventDetaio pops up right next to the EventItem
        if (eventRef.current.offsetTop < windowHeight / 2) setY();
        else setY(windowHeight - eventRef.current.offsetTop);
        const updateSize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            setEventItemWidth(eventRef.current.offsetWidth);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize)
    }, [windowHeight, windowWidth, eventItemWidth])

    return (
        <>
            <div className={`${styles.wrapper} ${showEventDetail ? styles.clicked : ''}`} ref={eventRef} onClick={handleEventClick}>
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
