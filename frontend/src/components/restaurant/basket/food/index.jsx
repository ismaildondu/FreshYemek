import React from 'react'
import styles from "../../Restaurant.module.css";

import {IoIosRemove} from 'react-icons/io';
import {BsPlus} from 'react-icons/bs';
import {IoTrashOutline} from 'react-icons/io5';
import { BasketContext } from '../../../../context/basket';

function FoodOption({food,merchant}) {
  
  const { basket, addBasketLocal,removeBasketLocal } = React.useContext(BasketContext);

  return (
    <div className={styles.food_option}>
        <div className={styles.food_option_header}>
            <h1>{food.name}</h1>
            <h1>{food.price} TL</h1>    
        </div>
        <div className={styles.food_option_quantity}>
            <div className={styles.food_option_quantity_container}>
                  {
                      food.quantity > 1 && (<IoIosRemove onClick={()=>removeBasketLocal(food,merchant.restaurant._id)}/>)
                  }
                  {
                      food.quantity === 1 && (<IoTrashOutline onClick={()=>removeBasketLocal(food,merchant.restaurant._id)} />)
                  }
                <h1>{food.quantity}</h1>
                <BsPlus onClick={()=>addBasketLocal(food,merchant.restaurant._id)} />
              </div>  
        </div>
    </div>
  )
}

export default FoodOption