import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import styles from './Settings.module.css'
import SettingSidebar from './SettingSidebar/SettingSidebar';
import { SettingNavbar } from "./SettingNavbar/SettingNavbar";
import { CalendarForm } from './CalendarForm/CalendarForm';
import { EditCalendarForm } from './EditCalendarForm/EditCalendarForm';
import { getCalendars } from '../../store/calendars';

export function Settings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const calendars = useSelector(state => state.calendars);
    const showSaveSettingModal = useSelector(state => state.modals.showSaveSettingModal)

    useEffect(() => {
        if (user) dispatch(getCalendars());
    }, [dispatch, user]);

    if (!calendars) return null;

    return (
        <div>
            <SettingNavbar />
            <div className={styles.main}>
                <SettingSidebar calendars={Object.values(calendars)} />
                <Routes>
                    <Route path='/createcalendar' element={<CalendarForm />} />
                    <Route path='/calendar/:calendarId' element={<EditCalendarForm calendars={calendars} />} />
                </Routes>
            </div>
            {showSaveSettingModal &&
                <div className={styles.modal}>
                    <div className={styles.modalText} style={{ right: `${window.innerWidth / 2}` }}>Setting saved</div>
                </div>
            }
        </div>
    )
}
