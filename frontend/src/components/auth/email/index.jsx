import styles from '../Auth.module.css'


import React from 'react'
import AuthPassword from '../password';
import AuthRegister from '../register';

import axios from 'axios';

function AuthEmail() {
  const [email, setEmail] = React.useState('');
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false);
  const [isAlreadyUser, setIsAlreadyUser] = React.useState("INITIAL");
  const buttonRef = React.useRef();


  let buttonText={
    text: 'Devam Et',
    loading: 'Kontrol Ediliyor...'
  }

  const ManuelLoading = (payload) => {
    setLoading(payload);
    if(payload) {
      buttonRef.current.innerText = buttonText.loading;
      setButtonStatus(false);
    }else{
      buttonRef.current.innerText = buttonText.text;
      setButtonStatus(true);
    }
  }
  const setButtonStatus = (payload) => {
    if(payload){
      buttonRef.current.style.backgroundColor = '#e40048';
      buttonRef.current.style.opacity = '1';
    }else{
      buttonRef.current.style.backgroundColor = '#4d494a';
      buttonRef.current.style.opacity = '0.5';
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setButtonStatus(true);
      
      setDisabled(false);
    } else {
      setButtonStatus(false);
      setDisabled(true);
    }
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    ManuelLoading(true);
    
    setTimeout(async () => {
      axios.post('http://localhost:8000/user/get-email-exist', {email}).then((res) => {
        if(res.data.success){
          setIsAlreadyUser(true);
        }
      }).catch((err) => {
        setIsAlreadyUser(false);
      }); 
     
      
    },2500);
  }


  return (
  

    <>  
     {
        isAlreadyUser === "INITIAL" && (
          <>
          <h1 className={styles.auth_card_title}>Email adresinizi giriniz</h1>
          <p className={styles.auth_card_description}>Hesabınız olup olmadığını kontrol edeceğiz.</p>
          <div className={styles.divider}></div>
          <form onSubmit={submitHandler}>
            <div className={styles.auth_card_input_container}>
              <input disabled={loading} onChange={emailHandler} value={email} type="email" placeholder="Email adresiniz" />
              <button type='submit' ref={buttonRef} disabled={disabled} className={styles.auth_card_button_disable}>{buttonText.text}</button>
            </div>
          </form>
          </>
          )
     }
     {
        isAlreadyUser === true && (<AuthPassword email={email} />)
     }
     {
        isAlreadyUser === false && (<AuthRegister email={email}/>)
     }
    </>

    
  )
}

export default AuthEmail