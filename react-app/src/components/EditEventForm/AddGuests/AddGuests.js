import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTentativeEventStatus } from '../../../store/event';
import styles from './AddGuests.module.css'


export default function AddGuests({ event, user }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(event.guests ? event.guests[user.id].status : false)
    const [guest, setGuest] = useState('')
    const handleAddGuest = () => {
        return
    }

    return (
        <div className={styles.wrapper}>
            {status && <select
                defaultValue={""}
                onChange={(e) => {
                    setStatus(e.target.value)
                    dispatch(updateTentativeEventStatus(user.id, e.target.value))
                }}>
                <option value="" hidden disabled>RSVP: {status[0].toUpperCase() + status.slice(1)}</option>
                <option value="yes">{status === 'yes' ? 'RSVP: Yes' : 'Yes'}</option>
                <option value="no">{status === 'no' ? 'RSVP: No' : 'No'}</option>
                <option value="maybe">{status === 'maybe' ? 'RSVP: Maybe' : 'Maybe'}</option>
            </select>}
            {!status && <div className={styles.placeholder}></div>}
            <div className={styles.guests}>Guests</div>

            <input
                placeholder='Add guests'
                name="Add guests"
                type="email"
                autoComplete='off'
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                    }
                }}

            />
            <button type='submit' hidden></button>

        </div>
    )
};
