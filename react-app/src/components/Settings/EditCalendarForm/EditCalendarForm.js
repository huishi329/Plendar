import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { updateCalendar } from "../../../store/calendars";
import { setSaveSettingModal } from "../../../store/modals";
import styles from './EditCalendarForm.module.css'

export function EditCalendarForm({ calendars }) {
    const dispatch = useDispatch();
    const params = useParams();
    const calendar = calendars[params.calendarId];
    const [name, setName] = useState(calendar.name);
    const [description, setDescription] = useState(calendar.description || '');
    const [timezone, setTimezone] = useState(calendar.timezone)
    const [errors, setErrors] = useState([]);
    const timezoneOptions = new Intl.Locale(window.navigator.language).timeZones;

    useEffect(() => {
        setName(calendar.name);
        setDescription(calendar.description);
        setTimezone(calendar.timezone);
        // Make sure the first useEffect run first to populate the correct calendar
        // eslint-disable-next-line
    }, [calendar.id]);

    useEffect(() => {
        if (name !== calendar.name || description !== calendar.description || timezone !== calendar.timezone) {
            dispatch(updateCalendar(calendar.id, { name, description, timezone }))
                .then(() => {
                    dispatch(setSaveSettingModal(true));
                    setTimeout(() => dispatch(setSaveSettingModal(false)), 3000);
                })
                .catch(e => {
                    const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage}`);
                    setErrors(errors);
                });
        }
        // eslint-disable-next-line
    }, [name, description, timezone])

    return (
        <form className={styles.form}>
            <div className={styles.title}>
                Calendar setting
            </div>
            {errors.length > 0 && <ul className={styles.formErrors}>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}
            <div className={styles.name}>
                <input
                    placeholder='Name'
                    type="text"
                    autoComplete='off'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </div>
            <div className={styles.description}>
                <textarea
                    placeholder='Description'
                    type="text"
                    autoComplete='off'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className={styles.timezone}>
                <label>Timezone</label>
                <select defaultValue={timezone}
                    onChange={(e) => setTimezone(e.target.value)}>
                    {timezoneOptions.map(timezone => (<option value={timezone} key={timezone}>{timezone}</option>))}
                </select>
            </div>
        </form>
    )
}
