import styles from './EventForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createEvent } from '../../store/events';
import { setCurrentDate } from '../../store/modals';
import { EventFormNavbar } from './EventFormNavbar/EventFormNavbar';
import { toggleCalendar } from '../../store/calendars';
import { Recording } from '../Recording/Recording';
import { setRecordingTranscript } from '../../store/sessionData';

export default function EventForm({ date, x, y }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const calendars = useSelector(state => state.calendars);
    const transcript = useSelector(state => state.sessionData.transcript);
    const inputField = useSelector(state => state.sessionData.inputField);
    const calendarsArr = Object.values(calendars);
    const [isRecordingTitle, setIsRecordingTitle] = useState(false);
    const [isRecordingDescription, setIsRecordingDescription] = useState(false);
    const calendarsOwned = calendarsArr?.filter(calendar => calendar.owner_id === user.id);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const startDateStr = date.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).split("/").reverse().join("-");
    const [currentHour, currentMinute] = new Date().toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit", timeZone: timezone }).split(":");
    const startTimeStr = (currentMinute < 30) ?
        `${currentHour}:30`
        : `${((Number(currentHour) + 1) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:00`
    const endTimeStr = (currentMinute < 30) ?
        `${((Number(currentHour) + 1) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:30`
        : `${((Number(currentHour) + 2) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:00`
    const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const tomorrowStr = tomorrow.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).split("/").reverse().join("-");

    const [expandTimeOptions, setExpandTimeOptions] = useState(false);
    const [expandMoreOptions, setExpanMoreOptions] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(startDateStr);
    const [endDate, setEndDate] = useState(startDateStr);
    const [startTime, setStartTime] = useState(startTimeStr);
    const [endTime, setEndTime] = useState(endTimeStr);
    const [recurrence, setRecurrence] = useState(0);
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("");
    const [calendarId, setCalendarId] = useState(calendarsOwned.find(calendar => calendar.is_displayed)?.id || calendarsOwned[0].id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const start_time = expandTimeOptions ? `${startDate} ${startTime}:00` : `${startDate} 00:00:00`;
        const end_time = expandTimeOptions ? `${endDate} ${endTime}:00` : `${endDate} 23:59:59`;
        const end_date = recurrence ? '9999-12-31 23:59:59' : end_time;

        dispatch(createEvent({
            title: title === '' ? '(No title)' : title,
            organiser_id: user.id,
            start_time,
            end_time,
            address,
            description,
            calendar_id: calendarId,
            recurrence,
            end_date
        })).then((event) => {
            dispatch(setCurrentDate(null));
            if (!calendars[event.calendar_id].is_displayed) dispatch(toggleCalendar(event.calendar_id, user.id));
        }).catch(e => {
            const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage} `);
            setErrors(errors);
        });
    };

    useEffect(() => {
        const closeEventForm = () => dispatch(setCurrentDate(null));

        document.addEventListener('click', closeEventForm);
        return () => document.removeEventListener('click', closeEventForm)
    }, [dispatch]);

    useEffect(() => {
        console.log('transcript', transcript, 'inputField', inputField);
        if (transcript) {
            if (inputField === 'title') {
                setTitle(transcript);
                setIsRecordingTitle(false);
            } else if (inputField === 'description') {
                setDescription(transcript);
                setIsRecordingDescription(false);
            }
        }
        return () => dispatch(setRecordingTranscript(''))
    }, [transcript, dispatch, inputField]);

    if (!calendarsArr) return null;

    return (
        <form className={styles.form} onSubmit={handleSubmit} style={{ left: x, top: y }}
            onClick={(e) => e.stopPropagation()}
        >
            <EventFormNavbar />
            {errors.length > 0 && <ul className={styles.formErrors}>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}
            <div className={styles.title}>
                {isRecordingTitle &&
                <div className={styles.loader}></div>}
                <input
                    placeholder={isRecordingTitle? "🗣" :'Add title and time'}
                    name="Add title"
                    type="text"
                    autoComplete='off'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div onClick={()=> setIsRecordingTitle(true)}>
                    <Recording />
                </div>
            </div>
            <div className={styles.datetime}>
                <i className="fa-regular fa-clock"></i>
                <div
                    className={`${styles.datePicker} ${expandMoreOptions || expandTimeOptions ? styles.afterExpand : ''} `}
                    onClick={() => setExpanMoreOptions(true)}>
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
                                    onChange={(e) => {
                                        setStartTime(e.target.value);
                                        const new_start_time = new Date(`${startDate} ${e.target.value}:00`);
                                        const new_end_time = new Date(new_start_time.getTime() + 3600000);
                                        setEndTime(new_end_time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: timezone }));
                                        setEndDate(new_end_time.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).split("/").reverse().join("-"));
                                    }}
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => {
                                        setEndTime(e.target.value)
                                        // allow event runs across midnight
                                        if (startTime > e.target.value && startDate === endDate) setEndDate(tomorrowStr);

                                    }}
                                />
                            </div>
                        }
                        {(startDate !== endDate || !expandTimeOptions || startTime > endTime) && <div>
                            {!expandTimeOptions && <span>-</span>}
                            <input
                                type="date"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>}
                    </div>
                    {(!expandTimeOptions && !expandMoreOptions) && <div className={styles.doNotRepeat}>Doesn't repeat</div>}
                </div>

                {(!expandTimeOptions && !expandMoreOptions) &&
                    <div>
                        <button type="button" className={styles.addTimeBtn}
                            onClick={() => {
                                setExpandTimeOptions(true);
                                if (startTimeStr > endTimeStr && startDate === endDate) setEndDate(tomorrowStr);
                            }}
                        >Add time</button>
                    </div>}
            </div>
            {(expandTimeOptions || expandMoreOptions) &&
                <div className={styles.moreOptions}>
                    <div className={styles.allDay}>
                        <input
                            type='checkbox'
                            checked={!expandTimeOptions}
                            name='allDay'
                            onChange={() => {
                                setExpandTimeOptions(!expandTimeOptions);
                                if (startTimeStr > endTimeStr && startDate === endDate) setEndDate(tomorrowStr);
                            }}
                        ></input>
                        <label htmlFor='allDay'>All day</label>
                    </div>
                    <select className={styles.recurrence}
                        onChange={(e) => setRecurrence(e.target.value)}>
                        <option value={0}>Doesn't repeat</option>
                        <option value={1}>Every day</option>
                        <option value={5}>Every weekday</option>
                        <option value={7}>Weekly on {date.toLocaleDateString('en-US', { weekday: 'long', timeZone: timezone })}</option>
                    </select>
                </div>}
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
            <div className={styles.description}>
                <i className="fa-solid fa-bars"></i>
                {isRecordingDescription &&
                <div className={styles.loader}></div>}
                <input
                    placeholder={isRecordingDescription? "🗣" :'Add description'}
                    className={styles.description}
                    name="Add description"
                    type="text"
                    autoComplete='off'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div onClick={()=> setIsRecordingDescription(true)}>
                    <Recording />
                </div>
            </div>
            <div className={styles.calendars}>
                <i className="fa-regular fa-calendar"></i>
                <select defaultValue={calendarId} onChange={(e) => setCalendarId(e.target.value)}>
                    {calendarsOwned?.map(calendar =>
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
