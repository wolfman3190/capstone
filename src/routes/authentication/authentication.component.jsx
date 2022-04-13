import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, 
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth,
} from '../../utils/firebase.utils'
import { async } from '@firebase/util';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up/sign-up-form.component';
import './authentication.styles.scss'; 


const Authentication = () => { 


    const logGoogleUser = async() =>  {
        const {user} = await signInWithGooglePopup(); 
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user); 
    };

    
    
    return (
        <div className='authentication-container'>
            <SignInForm/> 
            <SignUpForm/> 
        </div>
    )
}

export default Authentication;