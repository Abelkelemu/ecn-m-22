import { auth } from "../../firebase/utils";
import { firestore, storage } from "../../firebase/utils";
import { v4 as uuidv4 } from "uuid";
import { userError } from "./user.actions";
export const handleResetPasswordAPI = (email) => {

    const config = {
        url:'http://localhost:3000/login'
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
    const storageFolder = payload.field
    const imgname = uuidv4();

    return new Promise((resolve, reject) => {
      
      
      const uploadTask = storage.ref(`${storageFolder}/${imgname}-${image.name}`).put(image);
          
      uploadTask.on('state_changed' , snapshot => {

        //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log(progress)
    }, err => err
    ,() => {
      
      storage.ref(`${storageFolder}/${imgname}-${image.name}`).getDownloadURL().then(downloadURL => {
      firestore
        .collection('students')
        .doc(id)
        .update({
          [field] : downloadURL
        })
        .then(()=>{
          resolve();
        })
        .catch(err=>{
          reject(err);
        })
    })
})  
        });    
  }