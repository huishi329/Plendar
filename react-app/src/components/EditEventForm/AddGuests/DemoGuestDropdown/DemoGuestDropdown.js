import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addGuest } from '../../../../store/event'
import styles from './DemoGuestDropdown.module.css'
import { demoGuests } from './demoGuests'

export default function DemoGuestDropdown({ user, setShowDemoGuestDropdown }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const closeDropdown = () => setShowDemoGuestDropdown(false);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown)
    }, [setShowDemoGuestDropdown])

    return (
        <div className={styles.wrapper}>
            {demoGuests.map(guest => (
                <div className={styles.guest} key={guest.name}
                    onClick={() => dispatch(addGuest(guest.email, user))}>
                    <div className={styles.image}>
                        <img src={guest.profile_picture_url} alt={guest.name}></img>
                    </div>
                    <div>
                        <div className={styles.boldText}>{guest.name}</div>
                        <div className={styles.boldText}>{guest.email}</div>
                    </div>
                </div >)
            )}

        </div>

    )
}
