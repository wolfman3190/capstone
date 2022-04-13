import { useState } from 'react'; 
import { auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss'


const  defaultFormFields = {
    displayName: '',
    email: '', 
    password: '', 
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields; 

    console.log(formFields); 

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        console.log(event)
        const {name, value} = event.target; 

        setFormFields({...formFields, [name]:value});

    };

    const handleSubmit = async(event) => {
        event.preventDefault(); 
        if(password == confirmPassword) {
            try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {displayName}); 
            resetFormFields(); 
            
            } catch(error) {
                if(error.code == 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use'); 
                } else {
                    console.log('user creation encountered an error', error); 
                }
            } 
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
           <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
        
                <FormInput 
                label="displayName" 
                type="text" 
                required onChange={handleChange} 
                name="displayName" 
                value={displayName}
                />

                <FormInput 
                label="email" 
                type="text" 
                required onChange={handleChange} 
                name="email" 
                value={email}
                />

                <FormInput 
                label="password" 
                type="password" 
                required onChange={handleChange} 
                name="password" 
                value={password}
                />

                <FormInput 
                label="confirmPassword" 
                type="password" 
                required onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
                />

                <Button buttonType='inverted' type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm; 