import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentEvent } from '../../../../../store/modals';
import styles from './EventDetail.module.css'

export default function EventDetail({ event, x, y }) {
    const eventRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const closeEventDetail = (e) => {
            e.stopPropagation();
            if (e.path.find(ele => ele === eventRef.current)) return;
            dispatch(setCurrentEvent(null))
        };
        document.addEventListener('click', closeEventDetail);
        return () => document.removeEventListener('click', closeEventDetail)
    }, [dispatch])

    return (
        <div className={styles.wrapper} style={{ top: y }} ref={eventRef}>
            <div className={styles.title}>
                <i className="fa-solid fa-square"></i>
                {event.title}
            </div>
            <div>
                {new Date(event.start_time).toLocaleDateString(
                    'en-US',
                    { weekday: 'long', day: '2-digit', month: 'long' })
                }
            </div>
            {event.description && <div>
                <i className="fa-solid fa-bars"></i>
                {event.description}
            </div>}
        </div >
    )
}
