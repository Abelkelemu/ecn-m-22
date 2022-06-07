import { auth } from "../../firebase/utils";
import { firestore, storage } from "../../firebase/utils";
import { v4 as uuidv4 } from "uuid";


export const handleAddImage = payload => {
   
 
    const image = payload.image
    const studentUID = payload.studentUID
    const createdDate = payload.createdDate
    const imgname = uuidv4();
    
  
    return new Promise((resolve, reject) => {
      
      
      const uploadTask = storage.ref(`story-images/${imgname}-${image.name}`).put(image);
          
      uploadTask.on('state_changed' , snapshot => {
  
        //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log(progress)
    }, err => err
    ,() => {
      
      storage.ref(`story-images/${imgname}-${image.name}`).getDownloadURL().then(downloadURL => {
      firestore
        .collection('storyImages')
        .doc()
        .set({
          storyImageThumbnail : downloadURL,
          createdDate : createdDate,
          studentUID: studentUID
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
  
  export const handleDeleteImage = (documentID )=> {
    
    return new Promise((resolve, reject) => {
     
      firestore
        .collection('storyImages')
        .doc(documentID)
        .delete()
        .then(() => {
        //   console.log(documentID, 2)
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    });
  }


  export const handleFetchStoryImages = ({startAfterDoc,persistImages = []}) => {
  
    return new Promise((resolve, reject) => {
      const pageSize =6;   

      let ref = firestore.collection('storyImages').limit(pageSize);
      
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
  
