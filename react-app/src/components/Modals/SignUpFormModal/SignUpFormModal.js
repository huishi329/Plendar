import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setSignUpModal } from '../../../store/modals';
import SignUpForm from './SignUpForm';

export default function SignUpFormModal() {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setSignUpModal(false))}>
            <SignUpForm />
        </Modal>
    );
}
