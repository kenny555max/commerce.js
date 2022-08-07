import React, { useContext } from 'react';
import GlobalContext from '../ContextAPI/Context';

const Confirm = () => {
    const { checkoutToken, commerce, setCarts, nextStep, setOrder, setErrorMessage } = useContext(GlobalContext);

    return (
        <div>Confirm</div>
    )
}

export default Confirm;