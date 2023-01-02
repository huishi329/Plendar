import styles from './EditEventForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createEvent } from '../../store/events';
import { setCurrentDate, setCurrentEvent } from '../../store/modals';

export default function EditEventForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const event = useSelector(state => state.modals.event);
    const user = useSelector(state => state.session.user);
    const calendars = useSelector(state => Object.values(state.calendars));
    const calendars_owned = calendars?.filter(calendar => calendar.owner_id === user.id)

    const dateStr = event.start_time.toLocaleDateString({ year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-");
    const currentDate = new Date();
    const startTimeStr = (currentDate.getMinutes() < 30) ? `${currentDate.getHours()}:30` : `${currentDate.getHours() + 1}:00`
    const endTimeStr = (currentDate.getMinutes() < 30) ? `${currentDate.getHours() + 1}:30` : `${currentDate.getHours() + 2}:00`

    const [expandTimeOptions, setExpandTimeOptions] = useState(false);
    const [title, setTitle] = useState(event.title);
    const [startDate, setStartDate] = useState(dateStr);
    const [endDate, setEndDate] = useState(dateStr);
    const [startTime, setStartTime] = useState(startTimeStr);
    const [endTime, setEndTime] = useState(endTimeStr);
    const [recurrence, setRecurrence] = useState(0);
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [calendarId, setCalendarId] = useState(calendars_owned[0].id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const start_time = expandTimeOptions ? `${startDate} ${startTime}:00` : `${startDate} 00:00:00`;
        const end_time = expandTimeOptions ? `${endDate} ${endTime}:00` : `${endDate} 23:59:59`;
        const end_date = recurrence ? '9999-12-31 23:59:59' : end_time;
        dispatch(createEvent({
            title: title === '' ? '(No title)' : title,
            start_time,
            end_time,
            address,
            description,
            calendar_id: calendarId,
            recurrence,
            end_date
        })).then(() => dispatch(setCurrentDate(null)))
            .catch(e => {
                const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage}`);
                setErrors(errors);
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            {errors.length > 0 && <ul className={styles.formErrors}>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}
            <div className={styles.topContainer}>

                <div className={styles.title}>
                    <button className={styles.button} onClick={() => {
                        navigate('/');
                        dispatch(setCurrentEvent(null))
                    }}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                    <input
                        placeholder='Add title and time'
                        name="Add title"
                        type="text"
                        autoComplete='off'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.submitButton}
                >Save</button>

            </div>
            <div className={styles.datetime}>
                <div
                    className={styles.datePicker}>
                    <div className={styles.datePickerInput}>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        {expandTimeOptions &&
                            <div className={styles.timePicker}>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                                <span>to</span>
                                <input
                                    type="time"
                                    value={endTime}
                                    min={startTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                /></div>}

                        <div>
                            {!expandTimeOptions && <span>to</span>}
                            <input
                                type="date"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>
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
                <div className={styles.recurrence}>
                    <select
                        onChange={(e) => setRecurrence(e.target.value)}>
                        <option value={0}>Doesn't repeat</option>
                        <option value={1}>Every day</option>
                        <option value={7}>Weekly on {event.start_time.toLocaleDateString('en-US', { weekday: 'long' })}</option>
                        <option value={5}>Every weekday</option>
                    </select>
                </div>
            </div>
            <div className={styles.eventDetail}>

                <div className={styles.address}>
                    <i className="fa-solid fa-location-dot"></i>
                    <input
                        placeholder='Add location'
                        className={styles.address}
                        name="Add address"
                        type="text"
                        autoComplete='off'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className={styles.calendars}>
                    <i className="fa-regular fa-calendar"></i>
                    <select onChange={(e) => setCalendarId(e.target.value)}>
                        {calendars_owned?.map(calendar =>
                            (<option value={calendar.id} key={calendar.id}>{calendar.name}</option>))
                        }
                    </select>
                </div>
                <div className={styles.description}>
                    <i className="fa-solid fa-bars"></i>
                    <textarea
                        placeholder='Add description'
                        className={styles.description}
                        name="Add description"
                        type="text"
                        autoComplete='off'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

        </form >
    )
};