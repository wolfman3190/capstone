import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'; 
import { CartContext } from '../../context/cart.context';

import { useContext } from 'react';


import './cart-icon.styles.scss'

const CartIcon = () => {

    const {setIsCartOpen,isCartOpen} = useContext(CartContext); 

    const callback = () => {
        setIsCartOpen(!isCartOpen); 
    }

    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={callback}/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon; 