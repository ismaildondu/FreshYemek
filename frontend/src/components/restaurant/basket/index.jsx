import React from 'react'
import styles from "../Restaurant.module.css";

import { BasketContext } from '../../../context/basket';
import { useContext } from 'react';

import FoodOption from './food';

function Basket(restaurant) {

  const { basket } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = React.useState(0);


  const [diffrenceToMinimum, setDiffrenceToMinimum] = React.useState(0);
  let filteredBasket= basket.filter((basketItem) => basketItem.merchant === restaurant.restaurant._id);
  React.useEffect(() => {
    let total = 0;
    basket.map((food) => {
      if(food.merchant === restaurant.restaurant._id){
        total += food.price * food.quantity;
      }
    });
    setTotalPrice(total);
    setDiffrenceToMinimum(restaurant.restaurant.minOrder - total);
  }, [basket]);



   
  
  return (
    <div className={styles.basket}>
        
            <div className={styles.basket_content_sticky}>
             
            <div className={styles.basket_header}>
                <h1 className={styles.basket_title}>Sepetiniz</h1>
                <p className={styles.basket_sub_title}>Sepetinize ürün eklemeye başlayın</p>
            </div>
            
            {
                basket.length > 0 && (
                  <div className={styles.food_option_container}>
                    {
                      filteredBasket.map((food) => {
                        return (
                        
                            <FoodOption food={food} merchant={restaurant} />
                        
                        )
                    })
                    }
                   </div>
                )
            }

              <div className={styles.order_state}>
                <div className={styles.order_state_container}>
                 
                  <div className={styles.order_row}>
                    <h1 className={styles.order_state_title}>Toplam Tutar</h1>
                    <h1 className={styles.order_state_price}>{totalPrice} TL</h1>
                  </div>

                {
                  totalPrice > 0 && (
                  
                  <>
                
                  <div className={styles.order_row}>
                    <h1 className={styles.order_state_title}>Minumum tutar </h1>
                    <h1 className={styles.order_state_price}>{restaurant.restaurant.minOrder} TL</h1>
                </div>

                 {
                    diffrenceToMinimum > 0 && (
                      <div className={styles.order_row}>
                      <h1 className={styles.order_state_title}>Minumum tutar farkı</h1>
                      <h1 className={styles.order_state_price}>{diffrenceToMinimum} TL</h1>
                      </div>
                    )
                 }

              <div className={styles.order_row}>
                    <h1 className={styles.order_state_title}>Teslimat </h1>
                    <h1 className={styles.order_state_price}>{
                       restaurant.restaurant.deliveryCost > 0 ? restaurant.restaurant.deliveryCost+" TL" : "Ücretsiz"
                    }</h1>
                </div>
                  </>
                  )
                }

                </div>  
                  

              </div>
            


            
            </div>          

    </div>
  )
}

export default Basket