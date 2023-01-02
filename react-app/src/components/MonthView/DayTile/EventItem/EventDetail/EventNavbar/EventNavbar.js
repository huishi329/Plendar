import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../../../../../store/events";
import { setCurrentEvent } from "../../../../../../store/modals";
import styles from './EventNavbar.module.css'

export default function EventNavbar({ event, calendars }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.wrapper}>
            {(user.id === calendars[event.calendar_id].owner_id) && <div>
                <button className={styles.button}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/eventedit/${event.id}`);
                        window.localStorage.setItem('plendar', JSON.stringify({ event, calendars }));
                    }}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button className={styles.button} onClick={() => dispatch(deleteEvent(event.id))}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>}
            <button className={styles.button}
                onClick={() => dispatch(setCurrentEvent(null))}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div >
    )
}
