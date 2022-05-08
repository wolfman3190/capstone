import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'; 
import { CartContext } from '../../context/cart.context';

import { useContext } from 'react';


import './cart-icon.styles.scss'

const CartIcon = () => {

    const {setIsCartOpen,isCartOpen, cartCount} = useContext(CartContext);
    

    const callback = () => {
        setIsCartOpen(!isCartOpen); 
    }

    return (
        <div className='cart-icon-container' onClick={callback}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon; 