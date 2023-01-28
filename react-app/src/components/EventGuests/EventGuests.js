import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './EventGuests.module.css';
import { SingleGuest } from './SingleGuest/SingleGuest';

export function EventGuests({ event }) {
    const user = useSelector(state => state.session.user);
    const location = useLocation();
    const statusSummary = Object.values(event.guests).reduce((summary, guest) => {
        if (guest.status in summary) summary[guest.status] += 1
        else summary[guest.status] = 1
        return summary;
    }, {})

    return (
        <div className={styles.wrapper}>

            <div>
                <div className={styles.summary}>
                    {!event.guest_see_guest_list && event.organiser.id !== user.id ?
                        <div className={styles.hiddenGuestList}>
                            {location.pathname.match(/^.*eventedit.*$/) && <i className="fa-solid fa-user-group"></i>}
                            <div>The full guest list has been hidden at the organiser's request.</div>
                        </div>
                        :
                        <div>
                            <div>{Object.values(event.guests).length} guests</div>
                            <div className={styles.statusSummary}>
                                {Object.entries(statusSummary).map(([status, num]) => {
                                    return num + ' ' + status
                                }).join(', ')}
                            </div>
                        </div>}
                </div>
                <div>
                    {event.organiser.id in event.guests && <SingleGuest guest={event.guests[event.organiser.id]} event={event} />}
                    {Object.values(event.guests).map(guest => {
                        if (guest.id !== event.organiser.id)
                            return (<SingleGuest key={guest.id} guest={guest} event={event} />)
                        else return null
                    })}
                </div>
            </div>
        </div>
    )
};
