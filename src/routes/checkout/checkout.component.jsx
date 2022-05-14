import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss'; 


const Checkout = () => {

   const {cartItems, totalCost} = useContext(CartContext); 


   return(
       <div className='checkout-container'>
           <div className='checkout-header'>
               <div className='header-block'>
                    <span>Product</span>
               </div>
               <div className='header-block'>
                    <span>Description</span>
               </div>
               <div className='header-block'>
                    <span>Quantity</span>
               </div>
               <div className='header-block'>
                    <span>Price</span>
               </div>

               <div className='header-block'>
                    <span>Remove</span>
               </div>
           </div>
            {cartItems.map((cartItem) => (
                <CheckOutItem key= {cartItem.key} cartItem = {cartItem}/>
            ))}
            <span className='total'>Total Cost: ${totalCost}</span>
       </div>
      
   )

}


export default Checkout; 