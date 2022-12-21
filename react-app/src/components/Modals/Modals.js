import { useSelector } from 'react-redux';
import SigninFormModal from './SigninFormModal/SigninFormModal';


export default function Modals() {
    const modals = useSelector(state => state.modals);
    return <>
        {modals.showSigninModal && <SigninFormModal />}

    </>;
}
