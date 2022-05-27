
import { CartContext } from '../../context/cart.context';

import { useContext } from 'react';


import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles'

const CartIcon = () => {

    const {setIsCartOpen,isCartOpen, cartCount} = useContext(CartContext);
    

    const callback = () => {
        setIsCartOpen(!isCartOpen); 
    }

    return (
        <CartIconContainer onClick={callback}>
            <ShoppingIcon/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon; 