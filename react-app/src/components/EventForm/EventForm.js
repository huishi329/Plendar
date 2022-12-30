import styles from './EventForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function EventForm({ date, x, y }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const calendars = useSelector(state => Object.values(state.calendars));
    const calendars_owned = calendars?.filter(calendar => calendar.owner_id === user.id)

    const dateStr = date.toLocaleDateString({ year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-");
    const currentDate = new Date();
    const startTimeStr = (currentDate.getMinutes() < 30) ? `${currentDate.getHours()}:30` : `${currentDate.getHours() + 1}:00`
    const endTimeStr = (currentDate.getMinutes() < 30) ? `${currentDate.getHours() + 1}:30` : `${currentDate.getHours() + 2}:00`

    const [expandTimeOptions, setExpandTimeOptions] = useState(false);
    const [expandMoreOptions, setExpanMoreOptions] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(dateStr);
    const [endDate, setEndDate] = useState(dateStr);
    const [startTime, setStartTime] = useState(startTimeStr);
    const [endTime, setEndTime] = useState(endTimeStr);
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("");
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
                <div
                    className={`${styles.datePicker} ${expandMoreOptions || expandTimeOptions ? styles.afterExpand : ''}`}
                    onClick={() => setExpanMoreOptions(true)}>
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
                    {(!expandTimeOptions && !expandMoreOptions) && <div className={styles.doNotRepeat}>Doesn't repeat</div>}
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
            <div className={styles.address}>
                <i className="fa-solid fa-location-dot"></i>
                <input
                    placeholder='Add location'
                    className={styles.address}
                    name="Add address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
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
            <div className={styles.calendars}>
                <i className="fa-regular fa-calendar"></i>
                <select>
                    {calendars_owned?.map(calendar =>
                        (<option value={calendar.id} key={calendar.id}>{calendar.name}</option>))
                    }
                </select>

            </div>
            <button
                type="submit"
                className={styles.submitButton}
            >Save</button>
        </form >
    )
};
