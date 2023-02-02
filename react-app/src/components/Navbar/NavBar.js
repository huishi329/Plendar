
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLandingModal, setProfileDropdown, setSignInModal } from '../../store/modals';
import { LeftNavbar } from './LeftNavbar/LeftNavbar';
import styles from './NavBar.module.css'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

const NavBar = () => {
  const dispatch = useDispatch();
  const showProfileDropdown = useSelector(state => state.modals.showProfileDropdown)
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (!user) dispatch(setLandingModal(true))
  }, [dispatch, user])

  return (
    <div className={styles.navbarWrapper}>
      <nav>
        <LeftNavbar />
        <div className={styles.rightNavbar}>
          <div>
            <a className={styles.socialLink} target="_blank" rel="nofollow" href="https://huishi329.github.io/my-portfolio/">
              <img src='/logo2.png' alt='huishi logo'></img>
            </a>
            <a className={styles.socialLink} rel="nofollow" href="https://www.linkedin.com/in/huishi-an-8397311b1/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a className={styles.socialLink} target="_blank" rel="nofollow" href="https://github.com/huishi329">
              <i className="fa-brands fa-github"></i>
            </a>
            <a className={styles.socialLink} target="_blank" rel="nofollow" href="mailto:anhuishi95@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
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
