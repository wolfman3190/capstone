
import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app'; 
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

 } from 'firebase/auth'; 

import {
    getFirestore,
    doc,
    getDoc, 
    setDoc ,
    collection,
    writeBatch,
    query, 
    getDocs
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey); 
    const batch = writeBatch(db); 

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object);
    });

    await batch.commit(); 
    console.log('done'); 

    
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories'); 
    
    const q = query(collectionRef);
     
    
    const querySnapshot = await getDocs(q); 
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapShot) => {
        const {title, items} = docSnapShot.data(); 
        acc[title.toLowerCase()] = items; 
        return acc 
    }, {});

    return categoryMap; 

}


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


export const signInUserWithEmailAndAuth = async(email, password) => {
    if(!email || !password) return; 

    return await signInWithEmailAndPassword(auth,email, password)
}


export const signOutUser = async() => await signOut(auth); 

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); 
