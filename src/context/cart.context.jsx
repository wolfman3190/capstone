import { createContext, useState, useEffect } from "react";


//used to add items from the shop page 
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


// Used to add more items on the checkout page 
const addItems = (cartItems,cartItem) => {

    return cartItems.map((elem) => elem.id === cartItem.id 
        ? {...elem, quantity: elem.quantity + 1}
        :
        elem
        )

}

// Used to subtract items from the checkout page 
const subItems = (cartItems, cartItem) => {

    
    if(cartItem.quantity > 0) {
        return cartItems.map((elem) => elem.id === cartItem.id 
        ? {...elem, quantity: elem.quantity - 1}
        :
        elem
        )
    } else {
        return cartItems;
    }

}


//remove cart item on the checkout page
const removeItem = (cartItems,cartItem) => {

    return cartItems.filter((elem) => elem.id !== cartItem.id)

}

export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    totalCost: 0
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]); 
    const [cartCount, setCartCount] = useState(0);   
    const [totalCost, setTotalCost] = useState(0); 

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd)) 
    }

    const addMoreItems = (cartItem) => {
        setCartItems(addItems(cartItems, cartItem))
    }

    const subMoreItems = (cartItem) => {
        setCartItems(subItems(cartItems,cartItem))
    }

    const removeCartItem = (cartItem) => {
        setCartItems(removeItem(cartItems, cartItem))
    }

    useEffect(() => {
        setCartCount(
            cartItems.reduce((accum, item) => accum + item.quantity,0)
        )
    },[cartItems])


    useEffect(() => {
        setTotalCost(
            cartItems.reduce((accum,item) => accum + (item.quantity * item.price),0)
        )
    },[cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, addMoreItems, subMoreItems, removeCartItem, totalCost}; 

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}