import styles from './EventGuests.module.css';
import { SingleGuest } from './SingleGuest/SingleGuest';

export function EventGuests({ event }) {
    const organiser = event.guests[event.organiser.id];
    const statusSummary = Object.values(event.guests).reduce((summary, guest) => {
        if (guest.status in summary) summary[guest.status] += 1
        else summary[guest.status] = 1
        return summary;
    }, {})
    console.log(Object.entries(statusSummary));

    return (
        <div className={styles.wrapper}>
            <div>
                <i className="fa-solid fa-user-group"></i>
            </div>
            <div className={styles.guestList}>
                <div>
                    {Object.values.length} guests
                    <div className={styles.statusSummary}>
                        {Object.entries(statusSummary).map(([status, num]) => {
                            return num + ' ' + status
                        }).join(', ')}
                    </div>
                </div>
                <div>
                    <SingleGuest guest={organiser} event={event} />
                    {Object.values(event.guests).map(guest => {
                        if (guest.id !== organiser.id)
                            return (<SingleGuest key={guest.id} guest={guest} event={event} />)
                        else return null
                    })}
                </div>
            </div>
        </div>
    )
};
