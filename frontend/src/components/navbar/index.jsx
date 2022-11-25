import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Navbar.module.css'

import {RiUser3Fill} from 'react-icons/ri'
import {IoExitSharp} from 'react-icons/io5'

import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { PageContext } from '../../context/page'
import { Outlet } from 'react-router-dom'

import ENUMS from '../../services/enum/index';

function Navbar() {
    
  const {isLogged,userInformation} = useContext(AuthContext);
  const {page} = useContext(PageContext);
  

  const loginAndBasketVisibilityList=[
    ENUMS.PAGES.HOME,
  ]

  


  return (
    <>
     <nav className={styles.navbar}>
       
        <h1 className={styles.logo}>
          <NavLink to={ENUMS.PAGES.HOME}>FreshYemek</NavLink>
        </h1>

      {
        loginAndBasketVisibilityList.includes(page) && (
          <div className={styles.navbar_links}>
       
       
        <NavLink to={ENUMS.PAGES.AUTH}>
           <div className={styles.nav_box}>
           <RiUser3Fill className={styles.navbar_icon} />
           {
            userInformation && isLogged &&(<p>{
              userInformation.name[0].toUpperCase() + userInformation.name.slice(1).toLowerCase()
              }</p>)
           }
           {
            !userInformation && !isLogged && (<p>Giriş Yap</p>)
           }
           </div>
        </NavLink>

       {
         userInformation && isLogged && (
          <>
           <div className={styles.divider}/>
        
        <div className={styles.nav_box}>
          <NavLink to={ENUMS.PAGES.EXIT}>
            <IoExitSharp className={styles.navbar_icon}/>
          </NavLink>
        </div>
        </>
         )
       }
       
      </div>
        )
      }

     
    </nav>    
    <Outlet/>
    </>
   
    
  )
}

export default Navbar