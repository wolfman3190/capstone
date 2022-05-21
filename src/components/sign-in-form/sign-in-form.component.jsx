import { useState } from 'react'; 
import FormInput from '../form-input/form-input.component';
import { signInUserWithEmailAndAuth, 
    signInWithGooglePopup,
    createUserDocumentFromAuth } from '../../utils/firebase.utils';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import './sign-in-form.styles.scss';
import { UserContext } from '../../context/user.context';

const  defaultFormFields = {
    email: '', 
    password: '', 
}


const SignInForm = () => {
    const [formFields, fieldChange] = useState(defaultFormFields); 
    const {email, password} = formFields

    

    const signInWithGoogle = async() =>  {
        const {user} = await signInWithGooglePopup();  
        const userDocRef = await createUserDocumentFromAuth(user); 
    
    };

    const resetFields = () => {
        fieldChange(defaultFormFields);
    }
    const handleChange = (event) => {
        const {name, value } = event.target
        fieldChange({...formFields, [name]:value}); 

    }

    const handleSubmit = async(event) => { 
        event.preventDefault();

        try{
        const { user } = await signInUserWithEmailAndAuth(email,password);
      

        resetFields(); 
        }catch(error) {
            console.log(error.code); 
            switch(error.code) {
              case 'auth/user-not-found':
                alert('No user found!')
                break;
              case 'auth/wrong-password': 
                alert('Wrong Password!')
                break;
              default:
                console.log('Did not find it')
            }
        }
    }

    return(
        <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;