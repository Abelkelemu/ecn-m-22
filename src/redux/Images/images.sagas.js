
import { buffers } from "redux-saga";
import { takeLatest, call, all, put, take } from "redux-saga/effects";

// utils
import { auth,handleDeletePhotoFromStorage } from "../../firebase/utils";

//actions
import { setPercentage, fetchStoryImagesStart ,setStoryImages} from "./images.actions";
import { fetchUserStart } from "../User/user.actions";

// helper functions
import { handleAddImage, handleDeletePhotoFromFirestore, handleFetchStoryImages } from "./images.helper";

//Scripts
import imagesTypes from "./images.types";


export function* addImage ( {payload}) {  
    try{
      const studentUID =auth.currentUser.uid;
      const timestamp = new Date();
  
      const channel = yield handleAddImage({
        ...payload,
        studentUID: studentUID,
        createdDate: timestamp
      });

      while(true){
        const {progress=0, downloadURL,error} = yield take (channel,buffers.sliding(5));
        if(error){
          channel.close();
          return ;
        }
        if(downloadURL){
          yield put(fetchStoryImagesStart())
          yield put((fetchUserStart(studentUID)))
          yield put (setPercentage(0))
          return;
        }
        yield put(setPercentage(progress))
        
      }
    } catch (err){
      //  console.log(err);
    }
}
  
export function* onAddImageStart () {
    yield takeLatest (imagesTypes.ADD_NEW_IMAGE_START,addImage)
} 
  
  
export function* deleteImage({payload}) {
  const urlName = payload.urlName
  const documentID = payload.documentID
  const studentUID = payload.studentUID
    try {
      yield handleDeletePhotoFromFirestore(documentID,studentUID);
      yield handleDeletePhotoFromStorage(urlName);
      yield put((fetchUserStart(studentUID)))

      yield put (fetchStoryImagesStart()) 
    } catch (err) {
       console.log(err);
    }
}
  
  
export function* onDeleteImageStart() {
    yield takeLatest(imagesTypes.DELETE_IMAGE_START, deleteImage);
}

export function* fetchStoryImages ({payload}) {
    try{
      const storyImages = yield handleFetchStoryImages(payload);
      yield put (
        setStoryImages(storyImages)
      );
    } catch(err){
      // console.log(err)
    }  
}
  
export function* onFetchStoryImagesStart(){
  yield takeLatest(imagesTypes.FETCH_STORY_IMAGES_START,fetchStoryImages)
}

export default function* imagesSagas() {
    yield all([
      call(onAddImageStart),
      call(onDeleteImageStart),
      call(onFetchStoryImagesStart),
    ])
}