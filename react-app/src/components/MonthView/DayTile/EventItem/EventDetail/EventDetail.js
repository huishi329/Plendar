import { useEffect, useRef } from 'react'
import styles from './EventDetail.module.css'

export default function EventDetail({ event, x, y, setShowEventDetail }) {
    const eventRef = useRef();
    const eventDate = new Date(event.start_time)
    console.log(eventDate);

    useEffect(() => {
        const closeEventDetail = (e) => {
            e.stopPropagation();
            console.log(e);
            if (e.path.find(ele => ele === eventRef.current)) return;
            setShowEventDetail(false);
        };
        document.addEventListener('click', closeEventDetail);
        return () => {
            document.removeEventListener('click', closeEventDetail)
            setShowEventDetail(false);
        };
    }, [setShowEventDetail])

    return (
        <div className={styles.wrapper} style={{ top: y + 20 }} ref={eventRef}>
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
