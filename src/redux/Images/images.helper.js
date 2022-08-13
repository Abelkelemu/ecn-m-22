import { eventChannel} from "redux-saga";
import { incrementByOne, firestore,storage, decrementByOne } from "../../firebase/utils";
import { v4 as uuidv4 } from "uuid";


export const handleAddImage = payload => {
     
  const image = payload.image
  const studentUID = payload.studentUID
  const createdDate = payload.createdDate
  const imgname = uuidv4();

  return eventChannel(emitter => {
        
    const uploadTask = storage.ref(`story-images/${imgname}-${image.name}`).put(image);  
    uploadTask.on('state_changed' , snapshot => {
      const  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      emitter({progress});
    },
    error => {
      //console.log(error);
      emitter({error})
    },
    () => {storage.ref(`story-images/${imgname}-${image.name}`).getDownloadURL().then(downloadURL => {
      
            firestore
              .collection('storyImages')
              .doc()
              .set({
                storyImageThumbnail : downloadURL,
                createdDate : createdDate,
                studentUID: studentUID,
              })
              .then (()=>{
                firestore
                .collection('students')
                .doc(studentUID)
                .update({
                  count: incrementByOne
                })
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

export const handleDeletePhotoFromFirestore = (documentID,studentUID )=> {
    
    return new Promise((resolve, reject) => {
     
      firestore
        .collection('storyImages')
        .doc(documentID)
        .delete()
        .then (()=>{
          firestore
          .collection('students')
          .doc(studentUID)
          .update({
            count: decrementByOne
          })
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    });
}

export const handleFetchStoryImages = ({pageSize, startAfterDoc,persistImages = []}) => {
  
    return new Promise((resolve, reject) => {
  

      let ref = firestore.collection('storyImages').orderBy('createdDate','desc').limit(pageSize);
      
      if(startAfterDoc) ref = ref.startAfter(startAfterDoc);
        ref
          .get() 
          .then(snapshot => {
                const totalCount = snapshot.size;
                const data = [
                  ...persistImages,
                  ...snapshot.docs.map(doc => {
                    return{
                      ...doc.data(),
                      documentID: doc.id
                    }
                  })
                ];
              resolve({
                data,
                queryDoc:snapshot.docs[totalCount-1],
                isLastPage: totalCount< pageSize 
          })
        })
          .catch(err => {
              reject(err);
          })
    })
}
  

