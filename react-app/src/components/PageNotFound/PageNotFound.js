import styles from './PageNotFound.module.css'

export default function PageNotFound() {
    return (
        <div className={styles.container}>
            <h1>
                Oops, you have reached the desert ...
            </h1>
            <img src="https://media.tenor.com/rrMGOAL6NLMAAAAC/desert-carry.gif"></img>
        </div>
    )
}
