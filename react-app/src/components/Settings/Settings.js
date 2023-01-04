import styles from './Settings.module.css'
import { Route, Routes } from "react-router-dom";

import { SettingNavbar } from "./SettingNavbar/SettingNavbar";
import SettingSidebar from './SettingSidebar/SettingSidebar';
import { CalendarForm } from './CalendarForm/CalendarForm';

export function Setting() {
    return (
        <div>
            <SettingNavbar />
            <div className={styles.main}>
                <SettingSidebar />
                <Routes>
                    <Route path='/createcalendar' element={<CalendarForm />} />
                </Routes>
            </div>
        </div>
    )
}
