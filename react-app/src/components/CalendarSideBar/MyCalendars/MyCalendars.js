import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCalendars } from "../../../store/calendars";
import CalendarItem from '../CalendarItem/CalendarItem'
import styles from './MyCalendars.module.css'

export default function MyCalendars() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const calendars = useSelector(state => state.calendars);

    useEffect(() => {
        if (user) dispatch(getCalendars());
    }, [dispatch, user]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div>My calendar</div>
                <button className={styles.button}
                    data-tooltip={`Add a calendar`}
                    onClick={() => navigate('/settings/createcalendar')}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {calendars && Object.values(calendars).map(calendar =>
                (<CalendarItem calendar={calendar} key={calendar.id} />))}
        </div >
    )
}
