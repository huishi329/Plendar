import styles from './SignInForm.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import { setSignInModal, setSignUpModal } from '../../../store/modals'

export default function SignInForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signIn({ email, password }))
            .then(() => dispatch(setSignInModal(false)))
            .catch(e => {
                const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage}`);
                setErrors(errors);
            });
    };

    return (
        <form className={styles.signInForm} onSubmit={handleSubmit}>
            <div className={styles.signInHeader}>
                <div className={styles.signIn}>Sign in</div>
                <div className={styles.signInFormSignUpButton} onClick={() => {
                    dispatch(setSignUpModal(true));
                    dispatch(setSignInModal(false));
                }}>Sign up
                </div>
            </div>
            {
                errors.length > 0 && <ul className={styles.formErrors}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            }
            <label >
                Email<br />
                <input
                    className="field"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Password <br />
                <input
                    className="field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>

            <button type="submit" className={styles.signInButton}>Sign in</button>

            <button type="submit" className={styles.demoButton} onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
            }}>Log in as demo user</button>
        </form>
    );
}
