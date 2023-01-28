import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGuest, updateTentativeEventStatus } from '../../../store/event';
import { EventGuests } from '../../EventGuests/EventGuests';
import styles from './AddGuests.module.css'
import DemoGuestDropdown from './DemoGuestDropdown/DemoGuestDropdown';

export default function AddGuests({ event, user }) {
    const dispatch = useDispatch();
    // catch the edge case of deleting the last guest in event.guests
    const [status, setStatus] = useState(event.guests &&
        user.id in event.guests ? event.guests[user.id].status : false);
    const [guestEmail, setGuestEmail] = useState('');
    const [error, setError] = useState('');
    const [showDemoGuestDropdown, setShowDemoGuestDropdown] = useState(false);

    const handleAddGuest = (e) => {
        e.stopPropagation();
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (guestEmail.match(re)) {
                dispatch(addGuest(guestEmail, user))
                    .then(() => setGuestEmail(''))
                    .catch(e => {
                        setError(Object.values(e))
                    })
            } else setError('Invalid email address.');
        }
    }

    useEffect(() => {
        setStatus((event.guests &&
            user.id in event.guests > 0) ? event.guests[user.id].status : false)
    }, [event, setStatus, user.id])

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

            {error && <div data-error={error}></div>}
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
                onFocus={() => setShowDemoGuestDropdown(true)}
                onClick={(e) => e.stopPropagation()}
            />
            {showDemoGuestDropdown && <DemoGuestDropdown user={user} setShowDemoGuestDropdown={setShowDemoGuestDropdown} />}
            {event.guests &&
                Object.values(event.guests).length > 0 && <EventGuests event={event} />}
        </div>
    )
};
