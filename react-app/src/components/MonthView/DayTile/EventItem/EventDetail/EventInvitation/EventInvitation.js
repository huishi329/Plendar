import styles from './EventInvitation.module.css'
import { useSelector } from 'react-redux'

export default function EventInvitation({ event }) {
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.wrapper}>
            <div>
                Going?
            </div>
            <div className={styles.buttons}>
                <button className={event.guests[user.id].status === 'yes' ? styles.chosen : styles.notChosen}>Yes</button>
                <button className={event.guests[user.id].status === 'no' ? styles.chosen : styles.notChosen}>No</button>
                <button className={event.guests[user.id].status === 'maybe' ? styles.chosen : styles.notChosen}>Maybe</button>
            </div>
        </div>
    )
}
