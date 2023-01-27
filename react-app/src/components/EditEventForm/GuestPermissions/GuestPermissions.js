import styles from './GuestPermissions.module.css'
import { updateTentativeGuestPermission } from '../../../store/event';
import { useDispatch } from 'react-redux';


export default function GuestPermission({ event }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.wrapper}>
            <div>Guest Permission</div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='modifyEvent'
                    checked={event.guest_modify_event}
                    onChange={() => dispatch(updateTentativeGuestPermission('guest_modify_event'))}
                ></input>
                <label htmlFor='modifyEvent'>Modify event</label>
            </div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='inviteOthers'
                    checked={event.guest_invite_others}
                    onChange={() => dispatch(updateTentativeGuestPermission('guest_invite_others'))}

                ></input>
                <label htmlFor='inviteOthers'>Invite others</label>
            </div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='seeGuestList'
                    checked={event.guest_see_guest_list}
                    onChange={() => dispatch(updateTentativeGuestPermission('guest_see_guest_list'))}
                ></input>
                <label htmlFor='seeGuestList'>See guest list</label>
            </div>
        </div>
    )
}
