import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { Link, useNavigate } from 'react-router-dom'; 
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';




const CartDropdown = () => {

    const {cartItems} = useContext(CartContext); 
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }


    return (
       <CartDropdownContainer>
            <CartItems className='cart-items'>
                { cartItems.length ?  (cartItems.map((cartItem) => (
                <CartItem key= {cartItem.id} cartItem = {cartItem}></CartItem>
                ))) : (
                    <EmptyMessage>Your Cart is empty</EmptyMessage>
                )
            }
               
            </CartItems>
          
                <Button type='button' onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            
            

            

        </CartDropdownContainer>
    )
}

export default CartDropdown; 