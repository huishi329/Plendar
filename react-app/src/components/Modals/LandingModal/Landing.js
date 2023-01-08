import { useState } from 'react'
import SignInForm from '../SignInFormModal/SignInForm'
import styles from './Landing.module.css'

export default function Landing() {
    const [page, setPage] = useState(0);

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <img src='/landing/pots.jpg' alt='pots'></img>
            </div>
            <div className={styles.right}>
                <div className={styles.content}>
                    {page === 0 &&
                        <h1>Use Plendar to start planting your future self!</h1>
                    }
                    {page === 1 &&
                        <div>
                            <h2><i className="fa-solid fa-tree"></i>
                                Click anywhere to create a new event</h2>
                            <img src='/landing/create_event.png'></img>
                        </div>}
                    {page === 2 &&
                        <div>
                            <h2><i className="fa-solid fa-tree"></i>
                                Create calendars to seperate different parts of your life</h2>
                            <img src='/landing/add_calendar.png'></img>
                        </div>}
                    {page === 3 && <div className={styles.signIn} >
                        <h2>You are one step away from building your oasis</h2>
                        <SignInForm />
                    </div>}


                </div>
                <div className={styles.buttons}>
                    {page > 0 && page <= 3 && <button className={styles.pageButton} onClick={() => setPage(page - 1)}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>}
                    {page < 3 && <button className={styles.pageButton} onClick={() => setPage(page + 1)}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>}
                </div>
            </div>
        </div >
    )
}
