import styles from './SettingNavbar.module.css'

export function SettingNavbar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftNavbar}></div>
            <i className="fa-solid fa-arrow-left"></i>
        </div>
    )
}
