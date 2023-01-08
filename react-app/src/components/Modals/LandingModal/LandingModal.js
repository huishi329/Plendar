import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setLandingModal } from '../../../store/modals'
import Landing from './Landing';

export default function LandingModal() {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setLandingModal(false))}>
            <Landing />
        </Modal>
    );
}
