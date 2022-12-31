import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDate, setSignUpModal } from '../../../store/modals';
import EventForm from '../../EventForm/EventForm';
import styles from './DayTile.module.css'
import EventItem from './EventItem/EventItem';

export default function DayTile({ date }) {
    const user = useSelector(state => state.session.user);
    const modals = useSelector(state => state.modals)
    const dispatch = useDispatch();
    const tileRef = useRef();
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [tileWidth, setTileWidth] = useState(0)
    const isClicked = date.getDate() === modals.date?.getDate();
    const showAddEventForm = isClicked && user;

    const handleClick = (e) => {
        e.stopPropagation();
        if (user) {
            if (modals.date || modals.event || modals.showProfileDropdown) dispatch(setCurrentDate(null));
            else dispatch(setCurrentDate(date));
        }
        else dispatch(setSignUpModal(true));
    }

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
        if (tileRef.current.offsetLeft >= windowWidth - 500) setX(tileRef.current.offsetLeft - 450)
        else setX(tileRef.current.offsetLeft + (tileWidth || tileRef.current.offsetWidth));
        if (tileRef.current.offsetTop >= windowHeight - 323) setY(tileRef.current.offsetTop - 323);
        else setY(tileRef.current.offsetTop);
        const updateSize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            setTileWidth(tileRef.current.offsetWidth);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize)
    }, [windowHeight, windowWidth, tileWidth])

    return (
        <>
            <div className={styles.wrapper} ref={tileRef} onClick={handleClick}>
                <div className={styles.dayName}>{date.getDate()}</div>
                {day_events_sorted && day_events_sorted.map(event =>
                    (<EventItem event={event} key={event.id} />))}
            </div>
            {showAddEventForm && <EventForm date={date} x={x} y={y} />}
        </>
    )
}
