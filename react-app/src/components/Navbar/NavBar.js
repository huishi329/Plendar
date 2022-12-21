
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <nav>
        <div className={styles.leftNavbar}>
          <img src='/plendar.png' alt='plendar logo'></img>
          <div className={styles.logoText}>Plendar</div>
        </div>
        <div className={styles.rightNavbar}>
          <button>Log in</button>
        </div>
      </nav>

    </div>

  );
}

export default NavBar;
