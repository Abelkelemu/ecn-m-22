import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, handleUserProfile, getCurrentUser } from "../../firebase/utils";
import { setStoryImages } from "./images.actions";
import { handleAddImage, handleDeleteImage, handleFetchStoryImages } from "./images.helper";
import imagesTypes from "./images.types";

export function* addImage ( {payload}) {
 
 
  
    try{
      const timestamp = new Date();
  
      yield handleAddImage({
        ...payload,
        studentUID: auth.currentUser.uid,
        createdDate: timestamp
      });
      // yield put(
      //   fetchProductsStart()
      // );
  
    } catch (err){
      //  console.log(err);
    }
  }
  
  export function* onAddImageStart () {
   yield takeLatest (imagesTypes.ADD_NEW_IMAGE_START,addImage)
  } 
  
  
  export function* deleteImage({payload}) {
    try {
      yield handleDeleteImage(payload);
      // yield put (
      //   fetchProductsStart()
      // );
  
    } catch (err) {
      // console.log(err);
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