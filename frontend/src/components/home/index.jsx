import React from 'react'
import styles from './Home.module.css'

import {CgSearchLoading} from 'react-icons/cg'

import { useContext } from 'react'
import { PageContext } from '../../context/page'

import { NavLink } from 'react-router-dom'

import ENUMS from '../../services/enum/index';
import axios from 'axios'

function Home() {

  const {setPage} = useContext(PageContext);
 

  const [inputValue, setInputValue] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [addressSearch, setAddressSearch] = React.useState(false);
  const [buttonSearchable, setButtonSearchable] = React.useState(false);
  const [fakeLoading, setFakeLoading] = React.useState(false);

    React.useEffect(() => {
        setPage(ENUMS.PAGES.HOME);
    }, []);


 

    const handleChange = async (e) => {
        setButtonSearchable(false);
        setFakeLoading(true)
        setInputValue(e.target.value);
        let searchArray=[];
        if(e.target.value.length > 2){
        
        let serverData;
        await axios.get('http://localhost:8000/merchant/search/' + e.target.value).then((res) => {
            serverData = res.data.cleanedMerch;
        });
        
        if(serverData.length > 0){
            serverData.forEach((item) => {
                searchArray.push({
                    name: item.name,
                    id: item._id,
                    slug: item.slug
                });
            })
        }
     

        }
        if(searchArray.length>0){
            setAddressSearch(searchArray.slice(0,5))
            setTimeout(() => {
                setFakeLoading(false)
            }, 1000);
           
        }else{
            setAddressSearch(false)
            setButtonSearchable(false)
        }
    }

    const handleSearch = (address) => {
        setInputValue(address.name)
        setAddress(address)
        setAddressSearch(false)
        setButtonSearchable(true)
      
    }


  return (
    <div className={styles.container}>

    <div className={styles.hero}>
        <div className={styles.hero_text}>
            <h1 className={styles.hero_title}>Dünya kadar <span>yemek</span> ayağınıza gelsin!</h1>
        </div>
        <div className={styles.hero_adress}>

            <div className={styles.adress_group}>
                <input value={inputValue} onChange={handleChange} id="adress" required type="text"  />
                <label htmlFor='adress'>Restorant adı</label>

                {addressSearch && addressSearch.length>0 && (

                    <div className={styles.adress_search}>
                       
                        {!fakeLoading && addressSearch.map((item,index)=>(
                            <div onClick={()=>handleSearch(item)} key={index} className={styles.adress_search_item}>
                                {item.name}
                            </div>
                        ))}
                        {
                            fakeLoading && (
                                    <CgSearchLoading className={styles.adress_search_loading}/>
                            )
                        }
                    </div>
                )}
            </div>

            <div className={styles.button_group}>
                {
                    buttonSearchable && (
                        <NavLink to={"/restaurant/"+address.slug}>
                            <button className={styles.main_button}>Restoranta Git</button>
                        </NavLink>
                        
                    )
                }
                {
                    !buttonSearchable && (
                        <NavLink >
                        <button className={styles.main_button_disable}>Restoranta Git</button>
                        </NavLink>
                    )
                }

                
                <NavLink to={ENUMS.PAGES.RESTAURANTS} >
                <button className={styles.main_button}>
                        Hepsi
                </button>
                </NavLink>

               
               
               
           
            </div>
            
            
        </div>


    </div>

    

    </div>
  )
}

export default Home