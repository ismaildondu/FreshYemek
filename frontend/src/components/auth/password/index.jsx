import React from 'react'
import styles from '../Auth.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router';

import ENUMS from "../../../services/enum"
import axios from 'axios';

import { AuthContext } from '../../../context/auth';

function AuthPassword({email}) {

    const navigate = useNavigate();
    const {setIsLogged} = React.useContext(AuthContext);

    const [password, setPassword] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(true);


    
    const buttonRef = React.useRef();


    const setButtonStatus = (payload) => {
        if(payload){
            buttonRef.current.style.backgroundColor = '#e40048';
            buttonRef.current.style.opacity = '1';
        }else{
            buttonRef.current.style.backgroundColor = '#4d494a';
            buttonRef.current.style.opacity = '0.5';
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
      
        setDisabled(true);
        setButtonStatus(false);
        setButtonDisabled(true);
        buttonRef.current.innerText = 'Giriş Yapılıyor...';
    
        setTimeout(() => {

            buttonRef.current.innerText = 'Devam Et';

            setDisabled(false);
            setButtonDisabled(false);
            setButtonStatus(true);
            buttonRef.current.innerText = 'Devam Et';
            

            
            axios.post('http://localhost:8000/user/login', {email, password}).then((res) => {

                let data = res.data;
                if(data.success){
                    
                    let JSON_TOKEN = JSON.stringify(data.token);
                    localStorage.setItem('token', JSON_TOKEN);
                    
                    toast.success('Giriş Başarılı', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    
                    setIsLogged(true);

                    setTimeout(() => {
                        navigate(ENUMS.PAGES.HOME);
                        return;
                    }, 2000);
                }


            }).catch((err) => {
                
                toast.error('Giriş Başarısız', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    


            });

        }, 2000);




    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length > 0) {
            setButtonStatus(true);
            setButtonDisabled(false);
        } else {
            setButtonStatus(false);
            setButtonDisabled(true);
           
        }
    }

    return (
  

        <>  
         
          
                <ToastContainer />
              <h1 className={styles.auth_card_title}>Parolanızı Giriniz</h1>
              <p className={styles.auth_card_description}>Lütfen hesabınıza ait parolanızı giriniz.</p>
              <div className={styles.divider}></div>

              <form onSubmit={submitHandler}>
                <div className={styles.auth_card_input_container}>
                  <input disabled={true}  value={email} type="email" placeholder="Email adresiniz" />
                <input disabled={disabled} onChange={passwordHandler} value={password} type="password" placeholder="Parolanız" />
                  <button type='submit' ref={buttonRef} disabled={buttonDisabled}  className={styles.auth_card_button_disable}>Devam Et</button>
                </div>
              </form>
             
         
        
        </>
    
        
      )
}

export default AuthPassword