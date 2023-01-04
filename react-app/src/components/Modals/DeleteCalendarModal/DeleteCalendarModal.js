import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setDeleteCalendarModal } from '../../../store/modals'
import DeleteCalendar from './DeleteCalendar';

export default function DeleteCalendarModal() {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setDeleteCalendarModal(false))}>
            <DeleteCalendar />
        </Modal>
    );
}
