import styles from './MonthDay.module.css'

export default function MonthDay({ date }) {
    const isClicked = false;
    const handleClick = () => {
    }

    return (
        <div className={`${styles.wrapper} ${isClicked ? styles.clicked : ''}`} onClick={handleClick}>
            {`${date.getDate()} `}
        </div>
    )
}
