import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    //Find Item 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id)
    
    // increment counter by 1 
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        :
        cartItem
        )
    }
    
    return [...cartItems, {...productToAdd, quantity:1}]; 

}; 

export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0 
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]); 
    const [cartCount, setCartCount] = useState(0);   

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd)) 
    }

    useEffect(() => {
        setCartCount(
            cartItems.reduce((accum, item) => accum + item.quantity,0)
        )
    },[cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}; 

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}