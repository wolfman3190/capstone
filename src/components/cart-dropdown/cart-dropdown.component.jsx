import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { Link, useNavigate } from 'react-router-dom'; 
import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


const CartDropdown = () => {

    const {cartItems} = useContext(CartContext); 
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }


    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((cartItem) => (
                <CartItem key= {cartItem.id} cartItem = {cartItem}></CartItem>
                ))}
            </div>
          
                <Button type='button' onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            
            

            

        </div>
    )
}

export default CartDropdown; 