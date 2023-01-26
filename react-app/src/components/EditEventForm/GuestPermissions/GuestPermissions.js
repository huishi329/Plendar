import styles from './GuestPermissions.module.css'

export default function GuestPermission() {
    return (
        <div className={styles.wrapper}>
            <div>Guest Permission</div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='modifyEvent'
                ></input>
                <label htmlFor='modifyEvent'>Modify event</label>
            </div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='inviteOthers'
                ></input>
                <label htmlFor='inviteOthers'>Invite others</label>
            </div>
            <div className={styles.options}>
                <input
                    type='checkbox'
                    name='seeGuestList'
                ></input>
                <label htmlFor='seeGuestList'>See guest list</label>
            </div>
        </div>
    )
}
