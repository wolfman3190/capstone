import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, 
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth,
} from '../../utils/firebase.utils'
import { async } from '@firebase/util';

import SignUpForm from '../../components/sign-up/sign-up-form.component';



const SignIn = () => { 


    const logGoogleUser = async() =>  {
        const {user} = await signInWithGooglePopup(); 
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user); 
    };

    
    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm/> 
        </div>
    )
}

export default SignIn;