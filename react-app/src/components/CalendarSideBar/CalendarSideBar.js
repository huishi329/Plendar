import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDate } from '../../store/modals';
// import { Recording } from '../Recording/Recording';
import styles from './CalendarSideBar.module.css'
import MyCalendars from './MyCalendars/MyCalendars'
import SideCalendar from './SideCalendar/SideCalendar'

export default function CalendarSideBar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const sideCalendarDate = useSelector(state => state.sessionData.sideCalendarDate);
    const handleClick = () => {
        dispatch(setCurrentDate(sideCalendarDate));
    }

    return (
        <div className={styles.wrapper}>
            {user && <div className={styles.buttons}>
                <button className={styles.create} onClick={handleClick}>
                <i className="fa-solid fa-plus"></i>
                Create
            </button>
            {/* <Recording /> */}
            </div>}
            <SideCalendar />
            {user && <MyCalendars />}
        </div>
    )
}
