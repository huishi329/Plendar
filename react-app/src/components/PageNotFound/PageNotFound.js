import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import styles from './PageNotFound.module.css'


export default function PageNotFound() {
    const [count, setCount] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            if (count === 0) navigate("/");
            setCount(count - 1);
        }, 1000)
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h1>
                    Oops, you have reached the desert ...
                </h1>
                <NavLink className={styles.link} to='/'>You will be redirected to oasis in {count} seconds...</NavLink>
            </div>
            <img src="/desert-carry.gif" alt='page not found'></img>
        </div>
    )
}
