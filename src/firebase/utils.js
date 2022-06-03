import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firebaseConfig } from "./config";


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const handleUserProfile = async ({userAuth, additionalData}) => {
    if(!userAuth) return;
    const {uid} = userAuth;
    const userRef = firestore.doc(`students/${uid}`);
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);     
        },reject)
    })
}