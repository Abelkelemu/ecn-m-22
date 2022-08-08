import { v4 as uuidv4 } from "uuid";
import { eventChannel } from "redux-saga";

// utils

import { auth } from "../../firebase/utils";
import { firestore, storage } from "../../firebase/utils";



export const handleResetPasswordAPI = (email) => {

    const config = {
        url:'https://ecn-m-22.web.app/login'
    };
    return new Promise((resovle, reject) => {
        auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            resovle();
        })
        .catch(()=>{
            const err = ['Email not found, Please try again.'];
            reject(err);
        }); 
    }); 
}

export const handleUpdateImage = (payload) => {
   
  const id = payload.id
  const image = payload.image
  const field = payload.field
  const storageFolder = payload.storageFolder
  const imgname = uuidv4();

    return eventChannel(emitter => {
        
    const uploadTask = storage.ref(`${storageFolder}/${imgname}-${image.name}`).put(image);  
    uploadTask.on('state_changed' , snapshot => {
      const  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     // console.log(progress);
      emitter({progress});
    },
    error => {
      console.log(error);
      emitter({error})
    },
    () => {storage.ref(`${storageFolder}/${imgname}-${image.name}`).getDownloadURL().then(downloadURL => {
      
      firestore
        .collection('students')
        .doc(id)
        .update({
           [field] : downloadURL
        })
      .then(()=> {
        emitter({downloadURL})
      })
    })
  });
  return () => {
    uploadTask.off("state_changed");
  }
})

}

export const handleUpdateText = (payload) => {
      const id = payload.id
      const field = payload.field
      const newText = payload.newText
     
      return new Promise((resolve, reject) => {
      firestore
      .collection('students')
      .doc(id)
      .update({
        [field] : newText
      })
      .then(() => {
      //   console.log(documentID, 2)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
      }
)}

export const handleFetchUser = uID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('students')
      .doc(uID)
      .get()
      .then(snap => {
        if (snap.exists) {
          resolve({
            ...snap.data()
          })
        }
      })
      .catch(err => {
        reject(err);
        
      })
  })
}


export const handleFetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('students')
      .get()
      .then(snapshot => {
        const data = [
          ...snapshot.docs.map(doc => {
            return{
              ...doc.data()
            }
          })
        ];
      resolve({
        data
      })
      })
      .catch(err => {
        reject(err);
      })
  })
}