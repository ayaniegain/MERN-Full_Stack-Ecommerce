//context import
import  React, {createContext, useState,useContext,useEffect } from "react";

//create context
 const CartContext = createContext();
 const  CartProvider = ({ children }) => {
  let [cart, setCart] = useState([]);

 useEffect(() => {
  let existingCartItems= localStorage.getItem('cart')
  if (existingCartItems) {

    setCart(JSON.parse(existingCartItems))
    
  }
 }, [])
 
  return(
  <CartContext.Provider value={[ cart, setCart ]}>
    {children}
  </CartContext.Provider>
    )
};



//usecontext

const useCart = () => {
  return useContext(CartContext);
};

//export context
export {useCart,CartProvider};
