
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSigninModal } from '../../store/modals';
import styles from './NavBar.module.css'

const NavBar = () => {
  const dispatch = useDispatch();
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
            <button className={styles.userIcon}>

              <i className="fa-solid fa-user"></i>
            </button>
            :
            <button onClick={() => dispatch(setSigninModal(true))}> Sign in</button>
          }
        </div>
      </nav >

    </div >

  );
}

export default NavBar;
