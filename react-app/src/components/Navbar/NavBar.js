
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSigninModal } from '../../store/modals';
import styles from './NavBar.module.css'

const NavBar = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.navbarWrapper}>
      <nav>
        <div className={styles.leftNavbar}>
          <img src='/plendar.png' alt='plendar logo'></img>
          <div className={styles.logoText}>Plendar</div>
        </div>
        <div className={styles.rightNavbar}>
          <button onClick={() => dispatch(setSigninModal(true))}> Sign in</button>
        </div>
      </nav >

    </div >

  );
}

export default NavBar;
