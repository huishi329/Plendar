import { useState } from 'react'
import styles from './AddGuests.module.css'

export default function AddGuests({ event, user }) {
    const [status, setStatus] = useState(event.guests[user.id].status)
    return (
        <div className={styles.wrapper}>
            <select defaultValue={""}>
                <option value="" disabled hidden>RSVP: {status[0].toUpperCase() + status.slice(1)}</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
            </select>
        </div>
    )
};
