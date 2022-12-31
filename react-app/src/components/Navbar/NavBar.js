
import { useDispatch, useSelector } from 'react-redux';
import { setProfileDropdown, setSignInModal } from '../../store/modals';
import styles from './NavBar.module.css'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';


const NavBar = () => {
  const dispatch = useDispatch();
  const showProfileDropdown = useSelector(state => state.modals.showProfileDropdown)
  const user = useSelector(state => state.session.user)
  return (
    <div className={styles.navbarWrapper}>
      <nav>
        <div className={styles.leftNavbar}>
          <img src='/plendar.png' alt='plendar logo'></img>
          <div className={styles.logoText}>Plendar</div>
        </div>
        <div className={styles.rightNavbar}>
          {user ?
            <button
              onClick={() => dispatch(setProfileDropdown(true))}
              className={styles.userIcon}>
              <i className="fa-solid fa-tree"></i>
            </button>
            :
            <div className={styles.signInBtn}>
              <button
                onClick={() => dispatch(setSignInModal(true))}
              > Sign in</button>
            </div>
          }
        </div>
      </nav >
      {showProfileDropdown && <ProfileDropdown user={user} />}

    </div >

  );
}

export default NavBar;
