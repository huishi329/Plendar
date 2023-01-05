import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDate, setSignInModal } from '../../../store/modals';
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
    const [tileWidth, setTileWidth] = useState(0);

    date.setHours(23, 59, 59, 59);
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 59);
    const isCurrentDate = currentDate.getTime() === date.getTime();

    const isClicked = date === modals.date;
    const showEventForm = isClicked && user;

    const handleClick = (e) => {
        e.stopPropagation();
        if (user) {
            if (modals.date || modals.event || modals.showProfileDropdown) dispatch(setCurrentDate(null));
            else dispatch(setCurrentDate(date));
        }
        else dispatch(setSignInModal(true));
    }

    const events = useSelector(state => Object.values(state.events));
    // filter to get the events for the date
    const day_events = events?.filter(event => {
        const eventDate = new Date(event.start_time);
        // envents that doesn't repeat
        return ((event.recurrence === 0 && eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth()) ||
            // events that repeat daily
            (event.recurrence === 1 && date >= eventDate) ||
            // events that repeat weekly
            (event.recurrence === 7 && date >= eventDate && date.getDay() === eventDate.getDay()))
    })
    // Make a deep copy and then set date to the DayTile date
    const day_events_copy = JSON.parse(JSON.stringify(day_events))
    day_events_copy.forEach((event) => {
        event.start_time = new Date(event.start_time);
        event.end_time = new Date(event.end_time);
        const duration = event.end_time.getTime() - event.start_time.getTime();
        event.start_time.setDate(date.getDate());
        event.start_time.setMonth(date.getMonth());

        event.end_time.setTime(event.start_time.getTime() + duration);
    })

    const day_events_sorted = day_events_copy.sort((a, b) => {

        if (a.start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) > b.start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
            return 1;
        }
        else {
            return -1
        }
    });

    useEffect(() => {
        if (windowWidth < 900) setX((windowWidth - 450) / 2);
        else if (tileRef.current.offsetLeft > windowWidth / 2) setX(tileRef.current.offsetLeft - 450);
        else setX(tileRef.current.offsetLeft + (tileWidth || tileRef.current.offsetWidth));

        if (windowHeight < 500) setY(20);
        else if (tileRef.current.offsetTop >= windowHeight - 323) setY(tileRef.current.offsetTop - 323);
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
                <div className={`${styles.dayName} ${isCurrentDate ? styles.currentDate : ''}`}>
                    <span className={isCurrentDate ? styles.currentDate : ''}>{`${date.getDate()} `}</span>
                    {date.getDate() === 1 && <span>
                        {date.toLocaleDateString('en-US',
                            { month: 'short' })}</span>}
                </div>
                {day_events_sorted && day_events_sorted.map(event =>
                    (<EventItem event={event} key={event.id} />))}
            </div>
            {showEventForm && <EventForm date={date} x={x} y={y} />}
        </>
    )
}
