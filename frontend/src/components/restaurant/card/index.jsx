import React from 'react'
import styles from '../Restaurant.module.css';

import { BasketContext } from '../../../context/basket';
import { useContext } from 'react';

function RestaurantCard({item,merchant}) {

    const { basket, addBasketLocal } = useContext(BasketContext);
    
    const addToBasket = () => {
        addBasketLocal(item,merchant._id);
        
    }

    const isAlreadyInBasket = () => {
        let basketItem= basket.find((basketItem) => basketItem.id === item.id && basketItem.merchant === merchant._id);
        if(basketItem){
            return true;
        }
        return false;

    }

    const getBasketCount = () => {
        if(isAlreadyInBasket()){
            let basketItem= basket.find((basketItem) => basketItem.id === item.id && basketItem.merchant === merchant._id);
            const count = basketItem.quantity;
            if(count>99){
                return "99";
            }
            return count;
        }
        return false;
    }


  return (
    <div onClick={addToBasket} className={styles.restaurant_card_container}>
        <div className={styles.restaurant_card_content}>
            <div className={styles.restaurant_card_info}>
                {
                    getBasketCount()  && (
                        <div className={styles.restaurant_card_count}>
                            <h1>{getBasketCount()} x</h1>
                        </div>
                    )
                }
                <h1 className={styles.restaurant_card_title}>{item.name}</h1>
                <p className={styles.restaurant_card_description}>{item.description}</p>

                <div className={styles.restaurant_card_price}>
                    <h1 className={styles.restaurant_card_price_title}>{item.price} </h1>
                    <h1 className={styles.restaurant_card_price_currency}>TL</h1>
                </div>
            </div>

            <div className={styles.restaurant_card_image}>
                <img src={item.image} />
            </div>

        </div>
    </div>
  )
}

export default RestaurantCard