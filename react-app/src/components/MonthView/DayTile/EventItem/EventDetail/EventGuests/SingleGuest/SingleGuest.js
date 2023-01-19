import styles from './SingleGuest.module.css'

export function SingleGuest({ guest, event }) {

    return (

        <div key={guest.id} className={styles.wrapper}>
            <div className={styles.image}>
                <img src={guest.profile_picture_url} alt={guest.name}></img>
            </div>
            {guest.id === event.organiser.id ?
                (<div>
                    <div className={styles.boldText}>{guest.name}</div>
                    <div className={styles.organiser}>Organiser</div>
                </div>) :
                <div className={styles.boldText}>{guest.email}</div>}
        </div>
    )
}
