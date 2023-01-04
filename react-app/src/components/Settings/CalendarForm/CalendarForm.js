import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { createCalendar } from "../../../store/calendars";
import styles from './CalendarForm.module.css'

export function CalendarForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [errors, setErrors] = useState([]);
    const timezoneOptions = new Intl.Locale(window.navigator.language).timeZones;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(createCalendar({ name, description, timezone }))
            .then(() => navigate('/'))
            .catch(e => {
                console.log(e);
                const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage}`);
                setErrors(errors);
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.title}>
                Create new calendar
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
                    onChange={(e) => setName(e.target.value)}
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
            <button
                type="submit"
                className={styles.submitButton}
            >Create calendar</button>
        </form>
    )
}
