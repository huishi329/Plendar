import styles from './GuestPermissions.module.css'
import { useState } from 'react';


export default function GuestPermission({ event }) {
    const [modifyEvent, setModifyEvent] = useState(event.guest_modify_event);
    const [inviteOthers, setInviteOthers] = useState(event.guest_invite_others);
    const [seeGuestList, setSeeGuestList] = useState(event.guest_see_guest_list);

    return (
        <div className={styles.wrapper}>
            <div>Guest Permission</div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='modifyEvent'
                    checked={modifyEvent}
                    onChange={() => setModifyEvent(!modifyEvent)}
                ></input>
                <label htmlFor='modifyEvent'>Modify event</label>
            </div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='inviteOthers'
                    checked={inviteOthers}
                    onChange={() => setInviteOthers(!inviteOthers)}
                ></input>
                <label htmlFor='inviteOthers'>Invite others</label>
            </div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='seeGuestList'
                    checked={seeGuestList}
                    onChange={() => setSeeGuestList(!seeGuestList)}
                ></input>
                <label htmlFor='seeGuestList'>See guest list</label>
            </div>
        </div>
    )
}
