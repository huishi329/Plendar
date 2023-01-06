import { useDispatch } from 'react-redux';
import { setCurrentDate } from '../../../store/modals';
import styles from './EventFormNavbar.module.css'

export function EventFormNavbar() {
    const dispatch = useDispatch();
    return (
        <div className={styles.wrapper}>
            <button type='button'
                className={styles.button}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setCurrentDate(null))
                }}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    )
}
