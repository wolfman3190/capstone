import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom'; 

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';

import { signOutUser } from '../../utils/firebase.utils';
import {NaviagationContainer, NavLink, NavLinksContainer, LogoContainer} from './navigation.styles'; 

const Navigation = () => {

    const { currentUser } = useContext(UserContext); 
    const { isCartOpen } = useContext(CartContext); 
    
    const signOutHandler = async() => {
        await signOutUser(); 
       
    }

    return (
        <Fragment>
            <NaviagationContainer>
                <LogoContainer to = '/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to = '/shop' >
                        Shop
                    </NavLink>
                    {currentUser ? (
                            <NavLink as= 'span' onClick={signOutHandler}> SIGN OUT</NavLink>
                    )
                            :
                            (<NavLink to = '/auth'>
                            Sign In 
                        </NavLink>
                            )
                        
                    }
                    <CartIcon />
                   
                </NavLinksContainer>
                {isCartOpen && <CartDropdown/>}
            </NaviagationContainer>
            <Outlet />
        </Fragment>
      )
}

export default Navigation; 