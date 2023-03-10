import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styles from './DeleteCalendar.module.css'
import { setDeleteCalendarModal } from '../../../store/modals'
import { deleteCalendar } from '../../../store/calendars';
import { deleteEventsByCalendar } from '../../../store/events';

export default function DeleteCalendar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const calendar = useSelector(state => state.modals.calendar);

    const handleDelete = () => {
        if (calendar.is_default) {
            dispatch(deleteEventsByCalendar(calendar.id))
        } else {
            dispatch(deleteCalendar(calendar.id))
        }
        dispatch(setDeleteCalendarModal(false))
        navigate('/')
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                {calendar.is_default && `You are about to permanently delete all the events in ${calendar.name}. This action cannot be undone. Do you wish to continue?`}
                {!calendar.is_default && `You are about to permanently delete ${calendar.name} for everyone who uses it. Do you wish to continue?`}
            </div>
            <div className={styles.buttons}>
                <button onClick={() => dispatch(setDeleteCalendarModal(false))}>
                    Cancel
                </button>
                <button className={styles.removeButton} onClick={handleDelete}>
                    Permanently delete
                </button>
            </div>
        </div>
    )
}
