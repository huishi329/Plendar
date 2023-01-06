import { useDispatch, useSelector } from 'react-redux'
import styles from './DeleteCalendar.module.css'
import { setDeleteCalendarModal } from '../../../store/modals'
import { deleteCalendar } from '../../../store/calendars';
import { removeEvents } from '../../../store/events';

export default function DeleteCalendar() {
    const dispatch = useDispatch();
    const calendar = useSelector(state => state.modals.calendar);
    const handleDelete = () => {
        dispatch(deleteCalendar(calendar.id))
            .then(() => {
                dispatch(removeEvents(calendar.id));
                dispatch(setDeleteCalendarModal(false));
            });
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
