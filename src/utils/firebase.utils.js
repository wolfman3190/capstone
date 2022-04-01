import {initializeApp} from 'firebase/app'; 
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth'; 
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

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); 

    console.log(userAuth); 
    console.log(userDocRef); 

    const userSnapshot = await getDoc(userDocRef); 
    console.log(userSnapshot); 

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth; 
        const createdAt = new Date(); 
        
        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt
            });
        
        } catch(error) {
            console.log('error creating the user', error.message);
    }

}
return userDocRef; 
}



