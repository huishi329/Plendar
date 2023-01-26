import styles from './EditEventForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent, updateEventGuests, updateEventStatus } from '../../store/events';
import { setCurrentEvent } from '../../store/modals';
import { getCalendars, toggleCalendar } from '../../store/calendars';
import AddGuests from './AddGuests/AddGuests';
import { clearEvent, getEvent } from '../../store/event';

export default function EditEventForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const eventId = params.eventId;
    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.event);
    const calendars = useSelector(state => state.calendars);
    const calendarsOwned = calendars ? Object.values(calendars).filter(calendar => calendar.owner_id === user.id) : null;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (event) {
        event.start_time = new Date(event.start_time);
        event.end_time = new Date(event.end_time);
    }

    const startDateStr = event?.start_time.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).split("/").reverse().join("-");
    const endDateStr = event?.end_time.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).split("/").reverse().join("-");

    const startTimeStr = event?.start_time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: timezone })
    const endTimeStr = event?.end_time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: timezone })

    const [expandTimeOptions, setExpandTimeOptions] = useState(startTimeStr !== "00:00" && endTimeStr !== "23:59");
    const [title, setTitle] = useState(event?.title);
    const [startDate, setStartDate] = useState(startDateStr);
    const [endDate, setEndDate] = useState(endDateStr);
    const [startTime, setStartTime] = useState(startTimeStr === "00:00" && endTimeStr === "23:59" ? "10:00" : startTimeStr);
    const [endTime, setEndTime] = useState(startTimeStr === "00:00" && endTimeStr === "23:59" ? "10:30" : endTimeStr);
    const [recurrence, setRecurrence] = useState(event?.recurrence || 0);
    const [address, setAddress] = useState(event?.address || "");
    const [description, setDescription] = useState(event?.description || "");
    const [calendarId, setCalendarId] = useState(event?.calendar_id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log(event.guests);
        const start_time = expandTimeOptions ? `${startDate} ${startTime}:00` : `${startDate} 00:00:00`;
        const end_time = expandTimeOptions ? `${endDate} ${endTime}:00` : `${endDate} 23:59:59`;
        const end_date = recurrence ? '9999-12-31 23:59:59' : end_time;
        dispatch(updateEvent(event.id, {
            title: title === '' ? '(No title)' : title,
            organiser_id: event.organiser.id,
            start_time,
            end_time,
            address,
            description,
            calendar_id: calendarId,
            recurrence,
            end_date
        })).then((response) => {
            if (event.guests) {
                dispatch(updateEventGuests(event.id, Object.keys(event.guests)));
                if (event.guests[user.id]) dispatch(updateEventStatus(event.id, user.id, event.guests[user.id].status))
            }
            dispatch(setCurrentEvent(null));
            if (!calendars[response.calendar_id].is_displayed) dispatch(toggleCalendar(response.calendar_id));
            navigate('/');
        }).catch(e => {
            const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage}`);
            setErrors(errors);
        });
    };

    // Make page refreshable
    useEffect(() => {
        setExpandTimeOptions(startTimeStr !== "00:00" && endTimeStr !== "23:59");
        setTitle(event?.title);
        setStartDate(startDateStr);
        setEndDate(endDateStr);
        setStartTime(startTimeStr === "00:00" && endTimeStr === "23:59" ? "10:00" : startTimeStr);
        setEndTime(startTimeStr === "00:00" && endTimeStr === "23:59" ? "10:30" : endTimeStr);
        setRecurrence(event?.recurrence || 0);
        setAddress(event?.address || "");
        setDescription(event?.description || "");
        setCalendarId(event?.calendar_id)
    }, [event, endDateStr, endTimeStr, startDateStr, startTimeStr])

    useEffect(() => {
        dispatch(getEvent(eventId));
        dispatch(getCalendars());
    }, [dispatch, eventId]);

    if (!event || !calendars) return null;

    return (
        <form className={styles.form} onClick={(e) => e.stopPropagation()}>
            <div className={styles.wrapper}>
                <div className={styles.leftContainer}>
                    <div className={styles.title}>
                        <button type='button' className={styles.button} onClick={() => {
                            navigate('/');
                            dispatch(setCurrentEvent(null));
                            dispatch(clearEvent());
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

                    {errors.length > 0 && <ul className={styles.formErrors}>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}

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
                                            onChange={(e) => {
                                                setEndTime(e.target.value)
                                                // allow event runs across midnight
                                                if (startTime > e.target.value) {
                                                    console.log(startTime, e.target.value);
                                                    const tomorrow = new Date(event.start_time);
                                                    tomorrow.setDate(tomorrow.getDate() + 1);
                                                    const endDateStr = tomorrow.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).split("/").reverse().join("-");
                                                    setEndDate(endDateStr);
                                                }
                                            }}
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
                            <select defaultValue={recurrence}
                                onChange={(e) => setRecurrence(e.target.value)}>
                                <option value={0}>Doesn't repeat</option>
                                <option value={1}>Every day</option>
                                <option value={7}>Weekly on {event.start_time.toLocaleDateString('en-US', { weekday: 'long', timeZone: timezone })}</option>
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
                            <select defaultValue={calendarId} onChange={(e) => setCalendarId(e.target.value)}>
                                {calendarsOwned?.map(calendar =>
                                    (<option value={calendar.id} key={calendar.id} >{calendar.name}</option>))
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
                </div>
                <div className={styles.rightContainer}>
                    <button
                        type="button"
                        className={styles.submitButton}
                        onClick={handleSubmit}
                    >Save</button>
                    <AddGuests event={event} user={user} />
                </div>
            </div>
        </form >
    )
};
