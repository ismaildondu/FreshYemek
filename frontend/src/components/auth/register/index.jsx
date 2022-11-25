import React from 'react'
import styles from '../Auth.module.css'

import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {TiTick} from 'react-icons/ti'

import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router'
import ENUMS from "../../../services/enum"

import axios from 'axios';

function AuthRegister({email}) {

  const [showPassword, setShowPassword] = React.useState(false);
  const [inputPassword, setInputPassword] = React.useState('password');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [date, setDate] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const passwordStrengthLevel=[
 
    {
        text:"Zayıf",
        color:"red",
        width:"20%",
        
    },
    {
        text:"Güvensiz",
        color:"orange",
        width:"40%",
       
    },
    {
        text:"Orta",
        color:"green",
        width:"60%",
      
    },
    {
        text:"Güçlü",
        color:"#66a80f",
        width:"100%",
      
    },
    {
        text:"",
        color:"white",
        width:"0%",
   
    }

  ]

  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = React.useState("");


  const processRef = React.useRef();
  const passwordStrengthTextRef = React.useRef();
  
  const [mustContain, setMustContain] = React.useState([
    {
        text:"En az 10 karakter",
        status:false
        
    },
    {
        text:"En az 1 büyük harf",
        status:false
    },
    {
        text:"En az 1 küçük harf",
        status:false
    },
    {
        text:"En az 1 sayı",
        status:false
    },
    {
        text:"En az 1 özel karakter",
        status:false
    }
  ]);

  const mustContainEnum = {
    MIN_LENGTH:0,
    MIN_UPPERCASE:1,
    MIN_LOWERCASE:2,
    MIN_NUMBER:3,
    MIN_SPECIAL_CHAR:4
    }

  


  const setMustContainStatus = (index, status) => {
    setMustContain(prevState => {
      let newState = [...prevState];
      newState[index].status = status;
      return newState;
    });
  }

  const getMustContainCount = () => {
    let count = 0;
    mustContain.forEach(item => {
        if(item.status){
            count++;
        }
    });
    return count;
    }

    const getRegisterStatus = () => {

        let containCount=getMustContainCount();
        let nameTemp=name.trim();
        let surnameTemp=surname.trim();
        let dateTemp=date.trim();
        if(containCount===5 && nameTemp.length>0 && surnameTemp.length>0 && dateTemp.length>0 && !loading){
            return true;
        }else{
            return false;
        }
        

    }


  

  const setPasswordStrenghtView=(payload) => {
    setPasswordStrengthText(passwordStrengthLevel[payload].text);
    setPasswordStrength(payload);

    processRef.current.style.width = passwordStrengthLevel[payload].width;
    processRef.current.style.backgroundColor = passwordStrengthLevel[payload].color;
    passwordStrengthTextRef.current.style.color = passwordStrengthLevel[payload].color;
  }

  React.useEffect(() => {
    
  }, [passwordStrength]);



    React.useEffect(() => {
        if(password.length===0){
            setPasswordStrenghtView(4);
            setMustContainStatus(mustContainEnum.MIN_LENGTH, false);
            setMustContainStatus(mustContainEnum.MIN_UPPERCASE, false);
            setMustContainStatus(mustContainEnum.MIN_LOWERCASE, false);
            setMustContainStatus(mustContainEnum.MIN_NUMBER, false);
            setMustContainStatus(mustContainEnum.MIN_SPECIAL_CHAR, false);
        }else{
    
            if(password.length>=10){
                setMustContainStatus(mustContainEnum.MIN_LENGTH, true);
            }else{
                setMustContainStatus(mustContainEnum.MIN_LENGTH, false);
            }
    
            if(/[A-Z]/.test(password)){
                setMustContainStatus(mustContainEnum.MIN_UPPERCASE, true);
            }else{
                setMustContainStatus(mustContainEnum.MIN_UPPERCASE, false);
            }
    
            if(/[a-z]/.test(password)){
                setMustContainStatus(mustContainEnum.MIN_LOWERCASE, true);
            }else{
                setMustContainStatus(mustContainEnum.MIN_LOWERCASE, false);
            }
    
            if(/[0-9]/.test(password)){
                setMustContainStatus(mustContainEnum.MIN_NUMBER, true);
            }else{
                setMustContainStatus(mustContainEnum.MIN_NUMBER, false);
            }
    
            if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)){
                setMustContainStatus(mustContainEnum.MIN_SPECIAL_CHAR, true);
            }else{
                setMustContainStatus(mustContainEnum.MIN_SPECIAL_CHAR, false);
            }
        }

    },[password]);

    React.useEffect(() => {
        let mustContainCount = getMustContainCount();
        switch(mustContainCount){
            case 0:
                setPasswordStrenghtView(4);
                break;
            case 1:
                setPasswordStrenghtView(0);
                break;
            case 2:
                setPasswordStrenghtView(1);
                break;
            case 3:
                setPasswordStrenghtView(2);
                break;
            case 4:
                setPasswordStrenghtView(2);
                break;
            case 5: 
                setPasswordStrenghtView(3);
                break;
        }
    },[mustContain]);
  

  const passwordHandler =  (e) => {
     setPassword(e.target.value);
   
    }

  React.useEffect(() => {

    if(showPassword){
      setInputPassword('text');
    }else{
        setInputPassword('password');
    }
    
    }, [showPassword])

    const nameHandler = (e) => {
        setName(e.target.value);
    }
    const surnameHandler = (e) => {
        setSurname(e.target.value);
    }

    const dateHandler = (e) => {
        setDate(e.target.value);
    }

    const registerHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        
        if(getRegisterStatus()){
          
            axios.post('http://localhost:8000/user', {
                name,
                surname, 
                birthday:date,
                password, 
                email
            }).then(res => {

                if(res.status===200){
                    setTimeout(() => {
                        toast.success('Kayıt başarılı, lütfen giriş yapınız.');
                        setTimeout(() => {
                            navigate(ENUMS.PAGES.HOME);
                        }, 2000);
                    },2000)
                    
                }

            }).catch(err => {
               setTimeout(() => {
                toast.error('Kayıt başarısız');
                setLoading(false);
               },2000)
            });

        }


    }

  return (
   <>
    <ToastContainer />
    <h1 className={styles.auth_card_title}>Haydi başlayalım!</h1>
    <p className={styles.auth_card_description}>Öncelikle hesabınızı oluşturalım.</p>
    <div className={styles.divider}></div>
    <form onSubmit={registerHandler}>
        <div className={styles.auth_card_input_container}>
            <input type="email" disabled placeholder="Email adresiniz" value={email} className={styles.auth_card_input}/>
            <div className={styles.auth_card_input_container_group}>
                <input type="text" value={name} onChange={nameHandler} placeholder="Adınız" className={styles.auth_card_input}  />     
                <input type="text" value={surname} onChange={surnameHandler} placeholder="Soyadınız" className={styles.auth_card_input}  /> 
            </div>
            <input value={date} onChange={dateHandler} type="date"  className={styles.auth_card_input}  />
            <div className={styles.auth_card_password_input}>
                <input type={inputPassword} value={password} onChange={passwordHandler} placeholder="Şifreniz" className={styles.auth_card_input}  />
                {
                    showPassword ? (
                        <FaRegEye onClick={() => setShowPassword(!showPassword)}  />
                        
                    ) : (
                        <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)}  />
                    )
                }
            </div>
            <div className={styles.auth_card_password_strength}>Parola Güvenilirliği:<p ref={passwordStrengthTextRef}> <b>{passwordStrengthText}</b></p></div>
            <div className={styles.auth_card_password_strong_container}>
                <div className={styles.auth_card_password_strong_process}></div>
                <div ref={processRef} className={styles.auth_card_password_strong_process_bar}></div>
            </div>
            <div className={styles.auth_card_password_must_contain}>
                <p>Parolanızın içermesi gerekenler:</p>
                {
                    mustContain.map((item, index) => {
                        let className = item.status ? styles.auth_card_password_must_contain_item_tick : styles.auth_card_password_must_contain_item_cross;
                        return (
                            <div key={index} className={className}>
                                {
                                    item.status ? (
                                        <TiTick />
                                    ) : (
                                        <AiOutlineClose />
                                    )
                                }
                                <p>{item.text}</p>
                                
                            </div>
                        )
                    })
                }

            </div>
            
            {
                getRegisterStatus() ? (
                    <button type='submit' className={styles.auth_card_button}>Kayıt Ol</button>
                ) : (
                    <button disabled={true} className={styles.auth_card_button_disable}>Kayıt Ol</button>
                )
            }

        </div>
    </form>
   
   </>
  )
}

export default AuthRegister