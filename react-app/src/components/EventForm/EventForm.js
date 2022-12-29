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
    const [description, setDescription] = useState(null);
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
            <div className={styles.datetime}>
                <i className="fa-regular fa-clock"></i>
                <div className={styles.datePicker} onClick={() => setExpanMoreOptions(true)}>
                    <div className={styles.datePickerInput}>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        {expandTimeOptions ?
                            (<div className={styles.timePicker}>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    value={endTime}
                                    min={startTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                /></div>)
                            :
                            (<div>
                                <span>-</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>)}
                    </div>
                    {!expandTimeOptions && <div className={styles.doNotRepeat}>Doesn't repeat</div>}
                </div>


                {(!expandTimeOptions && !expandMoreOptions) &&
                    <div>
                        <button className={styles.addTimeBtn}
                            onClick={() => setExpandTimeOptions(true)}>Add time</button>
                    </div>}
            </div>
            {(expandTimeOptions || expandMoreOptions) &&
                <div className={styles.moreOptions}>
                    <div className={styles.allDay}>
                        <input
                            type='checkbox'
                            checked={!expandTimeOptions}
                            name='allDay'
                            onChange={() => setExpandTimeOptions(!expandTimeOptions)}
                        ></input>
                        <label htmlFor='allDay'>All day</label>
                    </div>
                    <select className={styles.recurrence}>
                        <option value={0}>Doesn't repeat</option>
                        <option value={1}>Every day</option>
                        <option value={7}>Weekly</option>
                    </select>
                </div>}
            <div className={styles.description}>
                <i className="fa-solid fa-bars"></i>
                <input
                    placeholder='Add description'
                    className={styles.description}
                    name="Add description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className={styles.button}
            >Save</button>
        </form >
    )
};
