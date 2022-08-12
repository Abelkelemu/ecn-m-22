import { buffers } from "redux-saga";
import { takeLatest, call, all, put, take } from "redux-saga/effects";


// utils
import { auth, handleUserProfile, getCurrentUser } from "../../firebase/utils";


//scripts
import userTypes from "./user.types";

//actions

import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess, signInError, setUser, fetchUserStart, setUserPercentage, setAllUsers } from "./user.actions";

//helper functions
import { handleResetPasswordAPI, handleUpdateImage,handleUpdateText, handleFetchUser, handleFetchAllUsers, handleDeletePhotoFromStorage} from "./user.helpers";

export function* getSnapshotFromUserAuth(user) {
    try{
     const userRef = yield call(handleUserProfile,{ userAuth: user});
     const snapshot = yield userRef.get();
     yield put(
         signInSuccess({
            id: snapshot.id,
            ...snapshot.data()
         })
     )
    }catch (err){
        //console.log(err);
    }
}


export function* emailSignIn({ payload: { email, password } }) {
    try {
  
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield getSnapshotFromUserAuth(user);
  
    } catch (err) {
      yield put(
        signInError(['Email or password is incorrect'])
      )
     // console.log(err);
    }
}
  

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) return;
      yield getSnapshotFromUserAuth(userAuth);
  
    } catch (err) {
      // const err = ['Email not found, Please try again.'];
       yield put(
        userError(err)
       )
      console.log(err);
    }
}
  
export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
      yield auth.signOut();
      yield put(
        signOutUserSuccess()
      )
  
    } catch (err) {
      // console.log(err);
    }
}
  
export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* resetPassword ({ payload: {email}}){
    
    try{ 
     yield call(handleResetPasswordAPI, email);
     yield put(
       resetPasswordSuccess()
   );
 
         } catch(err) {
             yield put(
               userError(err)
             )
         } 
}

export function* onResetPasswordStart(){
  yield takeLatest(userTypes.RESET_PASSWORD_START,resetPassword);
}

export function* updateImage ({payload}) {

  const uID = payload.id;
  try{
    const channel = yield handleUpdateImage(payload)
    
    while(true){
      const {progress=0, downloadURL,error} = yield take (channel,buffers.sliding(5));
      if(error){
        channel.close();
        return ;
      }
      if(downloadURL){
        yield put(fetchUserStart(uID))
        yield put(setUserPercentage(0))
        return;
      }
      yield put(setUserPercentage(progress))
    }
   

  }catch(err){
    //console.log(err)
  }
}

export function* onUpdateImageStart (){
  yield takeLatest(userTypes.UPDATE_IMAGE_START, updateImage);
}


export function* updateText ({payload}) {
  const uID = payload.id;
  try{
   yield handleUpdateText(payload)
   yield put(fetchUserStart(uID))
  
  }catch(err){
    console.log(err)
  }
}

export function* onUpdateTextStart (){
  yield takeLatest(userTypes.UPDATE_TEXT_START, updateText);
}


    export function* fetchUser ({payload}) {
    try{
      const user = yield handleFetchUser(payload);
      
      yield put (
        
        setUser(user)
      )
      
    } catch(err){
     // console.log(err)
    }
  
  }
  
  export function* onFetchUserStart(){
    yield takeLatest(userTypes.FETCH_USER_START,fetchUser)
  }


  export function* fetchAllUsers () {
    try{
      const AllUsers = yield handleFetchAllUsers();
      
      yield put (
        
        setAllUsers(AllUsers)
      )
      
    } catch(err){
     // console.log(err)
    }
  
  }
  
  export function* onFetchAllUsersStart(){
    yield takeLatest(userTypes.FETCH_ALL_USERS_START,fetchAllUsers)
  }


  

  export default function* userSagas() {
      yield all([call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onResetPasswordStart),
        call(onUpdateImageStart),
        call(onUpdateTextStart),
        call(onFetchUserStart),
        call(onFetchAllUsersStart),
   
        
      ])
  }