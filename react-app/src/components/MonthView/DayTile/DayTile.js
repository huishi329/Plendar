import styles from './DayTile.module.css'

export default function DayTile({ date }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.dayName}>{date.getDate()}</div>

        </div>
    )
}
