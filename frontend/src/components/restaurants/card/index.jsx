import React from 'react'
import styles from './Card.module.css';

import {AiFillStar} from 'react-icons/ai';

function Card({restaurant}) {

  let maxNameLength = 20;
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img src={restaurant.image} alt="restaurant" />
        <div className={styles.deliveryTime}>
            <p>{restaurant.deliveryTime}</p>
            <p>DAK.</p>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.nameCol}>
          <div className={styles.name}>
              <p>{restaurant.name.length > maxNameLength ? restaurant.name.substring(0,maxNameLength-3) + " ..." : restaurant.name}</p>
              </div>
          <div className={styles.rating}>
              <AiFillStar className={styles.star} />
              <p>{restaurant.averageScore || "?"}/5</p>
              <p className={styles.ratingCount}>({restaurant.totalReviews})</p>
          </div>
        </div>

        <div className={styles.categories}>
            <p>{restaurant.category.join(", ")}</p>
        </div>
        <div className={styles.minOrder}>
            <p>{restaurant.minOrder} TL</p><p>minumum</p>

            <div>|</div>

          <div className={styles.deliveryCost}>


          {
            restaurant.deliveryFee == "0" ?
            <p className={styles.freedelivery}>Ücretsiz Getirme</p> :
            <p><span>{restaurant.deliveryFee} TL</span>  <span>Getirme Ücreti</span></p>
          }

        </div>
        </div>
        
      </div>
          

    </div> 

  )
}

export default Card