import React from 'react'
import styles from './Restaurant.module.css';
import {useLocation,useParams} from 'react-router-dom';
import {AiFillStar} from 'react-icons/ai';

import Basket from './basket';
import RestaurantCard from './card';


import axios from 'axios';

function Restaurant() {

  const [restaurant, setRestaurant] = React.useState(null);
  const [menu, setMenu] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  

  React.useEffect(() => {
  
    async function getInitialData(){
      
    let slug = params.slug;
    axios.get(`http://localhost:8000/merchant`,{
      params: {
        slug: slug
      }
    }).then((res)=>{
      setRestaurant(res.data.MERCH_OBJ[0]);
      
        axios.get("http://localhost:8000/product/?"+"merchant="+res.data.MERCH_OBJ[0]._id).then((response)=>{
        setMenu(response.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }).catch((error)=>{
        console.log(error);
        return;
      });

    }).catch((err)=>{
      console.log(err);
      return;
    });
    }

    getInitialData();

  }, []);




  

  
 
  return (
    <div className={styles.container}>
      
      {
        restaurant && (

          <>
            <div className={styles.restaurantBox}>
            <div className={styles.restaurantImage}>
                <img src={restaurant.image} />
            </div>
            <div className={styles.restaurantInfo}>

              <div className={styles.content_container}>
                
                    <div className={styles.restaurantName}>
                      <h1 className={styles.title_restaurant}>{restaurant.name}</h1>
                      <h1 className={styles.comments}>Yorumlar</h1>
                    </div>

                    <div className={styles.rating}>
                      <AiFillStar className={styles.star} />
                      <p>{restaurant.averageScore ||"?"}/5</p>
                      <p className={styles.ratingCount}>({restaurant.totalReviews})</p>
                    </div>

                    <div className={styles.categories}>
                      {
                        restaurant.category.map((category, index) => {
                          return (
                            <p key={index}>{category}</p>
                          )
                        })
                      }
                    </div>
               </div>
            </div>

     
          <div className={styles.restaurant_menu}>
              <div className={styles.restaurant_menu_title}>
                <h1>Menü</h1>
              </div>

              <div className={styles.restaurant_menu_content}>
                    
                {
                  loading && (<h1>...</h1>)
                }
                {
                  !loading && menu.map((item, index) => {
                    return (
                      <RestaurantCard key={index} merchant={restaurant} item={item} />
                    )
                  }
                  ) 
                    
                  
                }

              </div>
          </div>

     

        </div>

        <Basket key={restaurant._id} restaurant={restaurant} />
        
        </>

        )
      }
        
    </div>
  )
}

export default Restaurant