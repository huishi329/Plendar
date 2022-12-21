import styles from './SignUpForm.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import { setSignUpModal } from "../../../store/modals";

export default function SignInForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (password !== confirmPassword) {
            setErrors(["Confirm password: The passwords you entered did not match."])
            return;
        }
        return dispatch(sessionActions.signUp({ email, name, password }))
            .then(() => dispatch(setSignUpModal(false)))
            .catch(e => {
                const errors = Object.entries(e.errors).map(([errorField, errorMessage]) => `${errorField}: ${errorMessage}`);
                setErrors(errors);
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>Create your Plendar account</div>
            <div className={styles.tagline}>to continue to Plendar</div>
            {errors.length > 0 && <ul className={styles.formErrors}>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}
            <label className={styles.label}>
                Email address <span style={{ color: "#A61A2E" }}>*</span><br />
                <input
                    className="field"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label className={styles.label}>
                Name <span style={{ color: "#A61A2E" }}>*</span><br />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label className={styles.label}>
                Password <span style={{ color: "#A61A2E" }}>*</span><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label className={styles.label}>
                Confirm <span style={{ color: "#A61A2E" }}>*</span><br />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button
                type="submit"
                className={`${styles.button} ${email && name && password && confirmPassword ? styles.buttonReady : styles.buttonNotReady}`}
            >
                Sign Up</button>
        </form>
    );
}
