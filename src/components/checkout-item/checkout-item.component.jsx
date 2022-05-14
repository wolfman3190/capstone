import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss'; 


const CheckOutItem = ({cartItem}) => {

    const {addMoreItems, subMoreItems, removeCartItem} = useContext(CartContext);

    const { name, quantity, imageUrl, price } = cartItem;

    const subCartItems = () => subMoreItems(cartItem); 
    const addCartItems = () => addMoreItems(cartItem); 
    const removeItem = () => removeCartItem(cartItem); 
    
    
    return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={name}></img>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div onClick={subCartItems} className='arrow'>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div onClick={addCartItems} className='arrow'>&#10095;</div>
        </span> 
        <span className='price'>{price}</span>
        <div className='remove-button'>
         <span onClick={removeItem}>&#10005;</span>
        </div>
        
        </div>
        
    
    )

} 


export default CheckOutItem;