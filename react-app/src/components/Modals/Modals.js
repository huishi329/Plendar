import { useSelector } from 'react-redux';
import SignInFormModal from './SignInFormModal/SignInFormModal';
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';

export default function Modals() {
    const modals = useSelector(state => state.modals);
    return <>
        {modals.showSignInModal && <SignInFormModal />}
        {modals.showSignUpModal && <SignUpFormModal />}

    </>;
}
