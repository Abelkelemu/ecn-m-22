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
    const storageFolder = payload.storageFolder
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


// export const handleAddImage = payload => {
   
 
//   const image = payload.image
//   const studentUID = payload.studentUID
//   const createdDate = payload.createdDate
//   const imgname = uuidv4();
  

//   return new Promise((resolve, reject) => {
    
    
//     const uploadTask = storage.ref(`story-images/${imgname}-${image.name}`).put(image);
        
//     uploadTask.on('state_changed' , snapshot => {

//       //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       //console.log(progress)
//   }, err => err
//   ,() => {
    
//     storage.ref(`story-images/${imgname}-${image.name}`).getDownloadURL().then(downloadURL => {
//     firestore
//       .collection('storyImages')
//       .doc()
//       .set({
//         storyImageThumbnail : downloadURL,
//         createdDate : createdDate,
//         studentUID: studentUID
//       })
//       .then(()=>{
//         resolve();
//       })
//       .catch(err=>{
//         reject(err);
//       })
//   })
// })  
//       });    
// }

// export const handleDeleteImage = (documentID )=> {
  
//   return new Promise((resolve, reject) => {
   
//     firestore
//       .collection('storyImages')
//       .doc(documentID)
//       .delete()
//       .then(() => {
//       //   console.log(documentID, 2)
//         resolve();
//       })
//       .catch(err => {
//         reject(err);
//       })
//   });
// }

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