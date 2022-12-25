import styles from './EventItem.module.css'

export default function EventItem({ event }) {
    return (<div className={styles.wrapper}>
        <div className={styles.content}>{`${event.start_time.toLocaleTimeString(
            'en-US',
            { hour: '2-digit', minute: '2-digit' })} ${event.title}`}</div>
    </div>)
}
