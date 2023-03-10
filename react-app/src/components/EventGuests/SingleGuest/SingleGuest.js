import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { removeGuest } from '../../../store/event';
import styles from './SingleGuest.module.css';

export function SingleGuest({ guest, event }) {
    const user = useSelector(state => state.session.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const removeGuestHandler = () => {
        dispatch(removeGuest(guest.id));
    }

    return (

        <div className={`${styles.wrapper} ${location.pathname.match(/^.*eventedit.*$/) &&
            event.organiser.id === guest.id && styles.background}`}>
            <div className={styles.left}>
                <div className={styles.image}>
                    <img src={guest.profile_picture_url} alt={guest.name}></img>
                    {guest.status === 'yes' && <i className="fa-regular fa-circle-check" style={{ color: '#188038', backgroundColor: 'rgba(107, 178, 156, 0.3)' }}></i>}
                    {guest.status === 'no' && <i className="fa-regular fa-circle-xmark" style={{ color: '#d93025', backgroundColor: 'rgba(234,67,53, 0.3)' }}></i>}
                    {guest.status === 'maybe' && <i className="fa-solid fa-question" style={{ backgroundColor: 'rgba(60, 64, 67, 0.3)', padding: '1.5px 3px', fontSize: 10 }}></i>}
                    {guest.status === 'awaiting' && <i className="fa-solid fa-spinner" style={{ fontSize: 12 }}></i>}
                </div>
                {
                    guest.id === event.organiser.id ?
                        (<div>
                            <div className={styles.boldText}>{guest.name}</div>
                            <div className={styles.organiser}>Organiser</div>
                        </div>) :
                        <div className={styles.boldText}>{guest.email}</div>
                }
            </div>
            {location.pathname.match(/^.*eventedit.*$/) &&
                user.id === event.organiser.id &&
                <div className={styles.right}
                    onClick={removeGuestHandler}
                    data-tooltip={'Remove'}>

                    <i className="fa-solid fa-xmark"></i>
                </div>}
        </div>
    )
}
