
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/auth';
import { useEffect } from 'react';

import ENUMS from '../../services/enum/index';


function ProtectedRoute({type,children}) {
    const {isLogged} = useContext(AuthContext);
    let navigate = useNavigate();
    useEffect(() => {
    if(type===ENUMS.PROTECTED_TYPES.ONLY_LOGGED_IN && !isLogged){
        return navigate(ENUMS.PAGES.AUTH);
    }
    if(type===ENUMS.PROTECTED_TYPES.ONLY_GUETS && isLogged){
        return navigate(ENUMS.PAGES.HOME);
    }
    }, [isLogged]);

    return (
        children
    )
}

export default ProtectedRoute