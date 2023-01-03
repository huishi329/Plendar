import styles from './SettingSidebar.module.css'

export default function SettingSidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.addCalendar}>
                <div className={styles.category}>Add calendar</div>
                <button className={styles.button}>Create new calendar</button>
            </div>
            <div className={styles.myCalendar}>
                <div className={styles.category}>Settings for my calendars</div>

            </div>
        </div>
    )
}
