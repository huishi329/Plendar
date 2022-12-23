import styles from './MonthView.module.css'
import DayTile from './DayTile/DayTile'
import moment from 'moment';
import DayOfWeek from './DayOfWeek/DayOfWeek';

export default function MonthView() {
    const targetDate = new Date()
    const year = targetDate.getFullYear()
    const month = targetDate.getMonth()
    targetDate.setDate(1);

    const firstDayOfMonth = targetDate.getDay();
    const monthDaysNum = moment(targetDate.toLocaleDateString(
        'en-us',
        { year: "numeric", month: "numeric" }), "MM/YYYY").daysInMonth();
    console.log(moment().days());

    return (
        <div className={styles.wrapper}>
            <DayOfWeek />
            <div className={styles.monthGrid}>
                {[...Array(monthDaysNum)].map((_, idx) => {
                    return <DayTile date={new Date(year, month, idx + 1)} key={idx + 1} />
                })
                }
            </div>
        </div>
    )
}
