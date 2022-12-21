import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setSignInModal } from '../../../store/modals'
import SignInForm from './SignInForm';

export default function SignInFormModal() {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setSignInModal(false))}>
            <SignInForm />
        </Modal>
    );
}
