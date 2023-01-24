import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGuest, updateTentativeEventStatus } from '../../../store/event';
import styles from './AddGuests.module.css'


export default function AddGuests({ event, user }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(event.guests ? event.guests[user.id].status : false);
    const [guestEmail, setGuestEmail] = useState('');
    const [error, setError] = useState('')
    console.log(error);
    const handleAddGuest = (e) => {
        e.stopPropagation();
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (guestEmail.match(re)) {
                dispatch(addGuest(guestEmail, user))
                    .then(() => setGuestEmail(''))
                    .catch(e => {
                        setError(Object.values(e))
                    })
            } else setError('Invalid email');
        }
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

            <div data-error={error}>
                <input
                    placeholder='Add guests'
                    name="Add guests"
                    type="email"
                    autoComplete='off'
                    value={guestEmail}
                    onChange={(e) => {
                        setError('');
                        setGuestEmail(e.target.value);
                    }}
                    onKeyDown={handleAddGuest}
                />
            </div>

        </div>
    )
};
