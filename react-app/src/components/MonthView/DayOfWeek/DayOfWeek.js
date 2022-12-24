import styles from './DayOfWeek.module.css'

export default function DayOfWeek() {
    return (
        <div className={styles.wrapper}>
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
        </div>
    )
}
