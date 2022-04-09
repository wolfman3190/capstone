
import {initializeApp} from 'firebase/app'; 
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
 } from 'firebase/auth'; 
import {
    getFirestore,
    doc,
    getDoc, 
    setDoc 
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC5kQhwS0kNhkpYvr4VpWFae8_K-gUsJyA",
    authDomain: "crwn-clothing-db-30dd3.firebaseapp.com",
    projectId: "crwn-clothing-db-30dd3",
    storageBucket: "crwn-clothing-db-30dd3.appspot.com",
    messagingSenderId: "970681862748",
    appId: "1:970681862748:web:975c0474c591ca92b1b499"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); 
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider); 
export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    if(!userAuth) return; 

    const userDocRef = doc(db, 'users', userAuth.uid); 

    const userSnapshot = await getDoc(userDocRef); 

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth; 
        const createdAt = new Date(); 
        
        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInformation
            });
        
        } catch(error) {
            console.log('error creating the user', error.message);
    }

}
return userDocRef; 
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return ; 

    return await createUserWithEmailAndPassword(auth, email, password)

}

