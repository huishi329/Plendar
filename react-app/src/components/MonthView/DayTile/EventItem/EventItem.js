import styles from './EventItem.module.css'

export default function EventItem({ event }) {
    return (<div className={styles.wrapper}>
        <div className={styles.content}>
            <div className={styles.dot}>
                <i className="fa-solid fa-circle"></i>
            </div>
            {`${new Date(event.start_time).toLocaleTimeString(
                'en-US',
                { hour: '2-digit', minute: '2-digit' })
                .toLowerCase()
                .split(" ")
                .join("")} ${event.title}`}</div>
    </div>)
}
