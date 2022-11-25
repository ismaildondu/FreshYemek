import React from "react";
import { createContext } from "react";

const BasketContext = createContext();

function BasketProvider({ children }) {
  const [basket, setBasket] = React.useState([]);

  React.useEffect(() => {
    const basket = localStorage.getItem("basket");
    if (basket) {
      setBasket(JSON.parse(basket));
    } else {
      localStorage.setItem("basket", JSON.stringify([]));
    }
  }, []);

  const addBasketLocal = (item, merchantID) => {
    const localBasket = localStorage.getItem("basket");
    const localBasketParse = JSON.parse(localBasket);

    const isAlready = localBasketParse.find(
      (i) => i.id == item.id && i.merchant == merchantID
    );

    if (isAlready) {
      const newLocalBasket = localBasketParse.map((i) => {
        if (i.id == item.id && i.merchant == merchantID) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
      localStorage.setItem("basket", JSON.stringify(newLocalBasket));
      setBasket(newLocalBasket);
    } else {
      const newLocalBasket = [
        ...localBasketParse,
        { ...item, quantity: 1, merchant: merchantID },
      ];
      localStorage.setItem("basket", JSON.stringify(newLocalBasket));
      setBasket(newLocalBasket);
    }
  };

  const removeBasketLocal = (item, merchantID) => {
    const localBasket = localStorage.getItem("basket");
    const localBasketParse = JSON.parse(localBasket);

    let newLocalBasket = [];
    localBasketParse.forEach((i) => {
      if (i.id == item.id && i.merchant == merchantID) {
        if (i.quantity > 1) {
          newLocalBasket.push({ ...i, quantity: i.quantity - 1 });
        }
      } else {
        newLocalBasket.push(i);
      }
    });

    localStorage.setItem("basket", JSON.stringify(newLocalBasket));
    setBasket(newLocalBasket);
  };

  const bag = {
    basket,
    addBasketLocal,
    removeBasketLocal,
  };

  return (
    <BasketContext.Provider value={bag}>{children}</BasketContext.Provider>
  );
}

export { BasketProvider, BasketContext };
