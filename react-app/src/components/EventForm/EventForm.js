import styles from './EventForm.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


export default function EventForm({ date, x, y }) {
    const dispatch = useDispatch();
    const dateStr = date.toLocaleDateString({ year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-");
    const currentDate = new Date();
    const timeStr = (currentDate.getMinutes() < 30) ? `${currentDate.getHours()}:30` : `${currentDate.getHours() + 1}:00`
    const [expandTimeOptions, setExpandTimeOptions] = useState(false);
    const [expandMoreOptions, setExpanMoreOptions] = useState(false);
    const [title, setTitle] = useState(null);
    const [startDate, setStartDate] = useState(dateStr);
    const [endDate, setEndDate] = useState(dateStr);
    const [startTime, setStartTime] = useState(timeStr);
    const [endTime, setEndTime] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} style={{ left: x, top: y }}>
            {errors.length > 0 && <ul className={styles.formErrors}>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}
            <input
                placeholder='Add title and time'
                className={styles.title}
                name="Add title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />


            <button
                type="submit"
                className={styles.button}
            >Save</button>
        </form >
    )
};
