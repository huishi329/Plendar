import { useState } from 'react'
import SignInForm from '../SignInFormModal/SignInForm'
import styles from './Landing.module.css'
import { useDispatch } from 'react-redux'
import { setLandingModal } from '../../../store/modals';

export default function Landing() {
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const handleClose = () => dispatch(setLandingModal(false));

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <img src='/landing/pots.jpg' alt='pots'></img>
            </div>
            <div className={styles.right}>
                <div className={styles.closeBtn}>
                    <i className="fa-regular fa-circle-xmark" onClick={handleClose}></i>
                </div>

                <div className={styles.content}>
                    {page === 0 &&
                        <div className={styles.aboutPage}>
                            <h1>Use Plendar to start planting your future self!</h1>
                            <div className={styles.aboutLink}>
                                <img src='/landing/LinkedIn.png' alt='LinkedIn'></img>
                                <a href='https://www.linkedin.com/in/huishi-an-8397311b1/'>Huishi An</a>
                            </div>
                            <div className={styles.aboutLink}>
                                <img src='/landing/Github.png' alt='Github'></img>
                                <a href='https://github.com/huishi329'>Huishi An</a>
                            </div>
                            <div className={styles.aboutLink}>
                                <i className="fa-solid fa-tree"></i>
                                <a href='https://github.com/huishi329/Plendar'>Plendar repo</a>
                            </div>

                        </div>
                    }
                    {page === 1 &&
                        <div className={styles.feature}>
                            <h2><i className="fa-solid fa-tree"></i>
                                Click anywhere to create a new event</h2>
                            <img src='/landing/create_event.png' alt='create event'></img>
                        </div>}
                    {page === 2 &&
                        <div className={styles.feature}>
                            <h2><i className="fa-solid fa-tree"></i>
                                Create calendars to seperate different parts of your life</h2>
                            <img src='/landing/add_calendar.png' alt='add calendar'></img>
                        </div>}
                    {page === 3 &&
                        <div className={styles.feature}>
                            <h2><i className="fa-solid fa-tree"></i>
                                Add guests for your event to connect with your community</h2>
                            <img src='/landing/guests_and_RSVP.png' alt='add guests and RSVP'></img>
                        </div>}
                    {page === 4 && <div className={styles.signIn} >
                        <h2>You are one step away from building your own oasis ...</h2>
                        <SignInForm />
                    </div>}
                </div>

                <div className={styles.buttons}>
                    {page > 0 && page <= 4 && <button className={styles.pageButton} onClick={() => setPage(page - 1)}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>}
                    {page < 4 && <button className={styles.pageButton} onClick={() => setPage(page + 1)}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>}
                </div>
            </div>
        </div >
    )
}
