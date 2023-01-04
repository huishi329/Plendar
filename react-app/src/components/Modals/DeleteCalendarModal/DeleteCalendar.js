import styles from './DeleteCalendar.module.css'

export default function DeleteCalendar() {
    return (
        <div>
            <div>
                {`Are you sure you want to remove Huishi? You'll no longer have access to this calendar and its events. Other people with access to the calendar can continue to use it.`}
            </div>
            <div>
                <button>
                    Cancel
                </button>
                <button>
                    Remove Calendar
                </button>
            </div>
        </div>
    )
}
