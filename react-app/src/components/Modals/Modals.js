import { useSelector } from 'react-redux';
import SignInFormModal from './SignInFormModal/SignInFormModal';


export default function Modals() {
    const modals = useSelector(state => state.modals);
    return <>
        {modals.showSignInModal && <SignInFormModal />}

    </>;
}
