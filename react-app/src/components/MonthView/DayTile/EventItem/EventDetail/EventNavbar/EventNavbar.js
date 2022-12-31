import { useDispatch, useSelector } from "react-redux"
import { setCurrentEvent } from "../../../../../../store/modals";
import styles from './EventNavbar.module.css'

export default function EventNavbar({ event, calendar }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.wrapper}>
            {(user.id === calendar.owner_id) && <div>
                <button className={styles.button}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button className={styles.button}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>}
            <button className={styles.button}
                onClick={(e) => {
                    dispatch(setCurrentEvent(null));
                }}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div >
    )
}
