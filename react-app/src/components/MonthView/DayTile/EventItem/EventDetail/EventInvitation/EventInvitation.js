import styles from './EventInvitation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateEventStatus } from '../../../../../../store/events';

export default function EventInvitation({ event }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const handleClick = (status) => {
        if (event.guests[user.id].status !== status)
            dispatch(updateEventStatus(event.id, user.id, status))
    }

    return (
        <div className={styles.wrapper}>
            <div>
                Going?
            </div>
            <div className={styles.buttons}>
                <button className={event.guests[user.id].status === 'yes' ?
                    styles.chosen : styles.notChosen}
                    onClick={() => handleClick('yes')}
                >Yes</button>
                <button className={event.guests[user.id].status === 'no' ?
                    styles.chosen : styles.notChosen}
                    onClick={() => handleClick('no')}
                >No</button>
                <button className={event.guests[user.id].status === 'maybe' ?
                    styles.chosen : styles.notChosen}
                    onClick={() => handleClick('maybe')}
                >Maybe</button>
            </div>
        </div>
    )
}
