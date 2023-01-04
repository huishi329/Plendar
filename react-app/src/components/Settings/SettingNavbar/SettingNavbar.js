import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfileDropdown } from '../../../store/modals'
import ProfileDropdown from '../../Navbar/ProfileDropdown/ProfileDropdown'
import styles from './SettingNavbar.module.css'

export function SettingNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showProfileDropdown = useSelector(state => state.modals.showProfileDropdown)
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.wrapper}>
            <nav>
                <div className={styles.title}>
                    <button className={styles.backButton}
                        onClick={() => navigate('/')} >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    Settings
                </div>
                <div>
                    <button
                        onClick={() => dispatch(setProfileDropdown(true))}
                        className={styles.userIcon}>
                        <i className="fa-solid fa-tree"></i>
                    </button>
                </div>
            </nav>
            {showProfileDropdown && <ProfileDropdown user={user} />}
        </div>
    )
}
