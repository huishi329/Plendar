import styles from './EventGuests.module.css';

export function EventGuests({ event }) {
    const organiser = event.guests[event.organiser.id];

    return (
        <div className={styles.wrapper}>
            <div>
                <i className="fa-solid fa-user-group"></i>
            </div>
            <div className={styles.guestList}>
                <div>
                    {Object.values.length} guests
                </div>
                <div>

                </div>
            </div>
        </div>
    )
};
