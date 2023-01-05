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
                {`Are you sure you want to remove ${calendar.name}? You'll no longer have access to this calendar and its events. Other people with access to the calendar can continue to use it.`}
            </div>
            <div className={styles.buttons}>
                <button onClick={() => dispatch(setDeleteCalendarModal(false))}>
                    Cancel
                </button>
                <button className={styles.removeButton} onClick={handleDelete}>
                    Remove Calendar
                </button>
            </div>
        </div>
    )
}
