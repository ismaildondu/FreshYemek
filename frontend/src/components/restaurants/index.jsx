import styles from './Restaurants.module.css';

import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {NavLink} from 'react-router-dom';

import Card from './card';

import axios from 'axios';

function Restaurants() {
    const sliderSettings = {
        
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        dots: true,
      };

    const [restaurants, setRestaurants] = React.useState([]);
    const staticImages = [
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/16a0e908-6971-11ed-801a-ca3ea0e01537/desktop_tile_EnYVKS.jpg?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/89930e1d-6736-11ed-bb35-f2dd68519a3e/desktop_tile_EnRdhL.png?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/4a346904-698e-11ed-b1bf-a220de78503c/desktop_tile_EnFMFn.png?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/1b168525-4963-11ed-91b3-c20f98570889/desktop_tile_EnuSUt.jpg?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/d46bd027-6969-11ed-a340-62e204522e2f/desktop_tile_EnIGCV.jpg?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/7a2d1fa1-4e32-11ed-9782-f645ffad1ffb/desktop_tile_Enukvt.jpg?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-tr/campaign-assets/bab25cf5-59dd-11ed-a254-b6657ec81bdb/desktop_tile_EnIbIp.jpg?height=240&quality=95&width=560&",
    ];


    React.useEffect(() => {

        axios.get('http://localhost:8000/merchant/')
        .then((response) => {

            setTimeout(()=>{
                setRestaurants(response.data.MERCH_OBJ);
            },1000);

        })
        .catch((error) => {
            console.log(error);
        })

    }, []);

  

  return (
    <div className={styles.container}>
        <Slider {...sliderSettings}>
            {staticImages.map((item,index)=>{
                return (
                    <div className={styles.sliderItem} key={index} >
                        <img width={280} height={120} src={item} />
                    </div>
                )
            }
            )}
        </Slider>

        <h1 className={styles.restaurants_title}>All restaurants 🌟</h1>
        {

            restaurants.length > 0 && (
                <div className={styles.restaurants_list_grid}>
                {restaurants.map((item,index)=>{
                    return (
                        <NavLink to={"/restaurant/"+item.slug} key={index} state={item} >
                            <Card key={index} restaurant={item} />
                        </NavLink>
                    )
                }
                )}
    
            </div>
            )

        }

        {
            restaurants.length === 0 && (
                <h1 className={styles.loadres}>Yükleniyor</h1>
            )
        }
        
    </div>
  )
}

export default Restaurants