import React from 'react'
import styles from './Auth.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { PageContext } from '../../context/page'
import ENUMS from '../../services/enum/index';
import { useNavigate } from 'react-router'


import {IoMdArrowBack} from 'react-icons/io';

import AuthEmail from './email'



function Auth() {
   const {setPage} = useContext(PageContext);
   const [type, setType] = React.useState({});
   

   const navigate = useNavigate();
   React.useEffect(() => {
      setPage(ENUMS.PAGES.AUTH);
      setType(ENUMS.AUTH_TYPES.NO_INITIAL);
    }, []);

    const setTypeEmail = () => {
      setType({...type, type: ENUMS.AUTH_TYPES.EMAIL});
 
    }

    const backHandler = () => {
        navigate(-1);
        return;
    }
    
  
 
  return (
    <div className={styles.auth_container}>
            <div className={styles.auth_card}>
                    
            {
                type === ENUMS.AUTH_TYPES.NO_INITIAL && (
                  <>
                    <div className={styles.auth_card_header}>
                    <IoMdArrowBack onClick={backHandler}/>
                    </div>
                    <h1 className={styles.auth_card_title}>Hoşgeldin!</h1>
                    <p className={styles.auth_card_description}>Giriş yapın veya kayıt olun.</p>
                    <div className={styles.divider}></div>
                    <button onClick={setTypeEmail} className={styles.auth_card_button}>Giriş Yap</button>
                    <button onClick={setTypeEmail} className={styles.auth_card_button_only_border}>Kayıt Ol</button>  
                  </>
                )
            }
            {
                type.type === ENUMS.AUTH_TYPES.EMAIL && (
                  <AuthEmail  />
                )
            }
           

        </div>        
    </div>

  )
}

export default Auth