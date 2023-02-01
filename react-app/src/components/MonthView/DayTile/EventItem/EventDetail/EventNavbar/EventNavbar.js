import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getEvent } from "../../../../../../store/event";
import { deleteEvent } from "../../../../../../store/events";
import { setCurrentEvent } from "../../../../../../store/modals";
import styles from './EventNavbar.module.css'

export default function EventNavbar({ event }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.wrapper}>
            {(user.id === event.organiser.id || (event.guests && user.id in event.guests)) &&
                <button className={styles.button}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/eventedit/${event.id}`);
                        dispatch(getEvent(event.id));
                    }}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            }
            {user.id === event.organiser.id &&
                <button className={styles.button} onClick={() => dispatch(deleteEvent(event.id))}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            }
            <button className={styles.button}
                onClick={() => dispatch(setCurrentEvent(null))}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div >
    )
}
