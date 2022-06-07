import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, handleUserProfile, getCurrentUser } from "../../firebase/utils";
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess, signInError } from "./user.actions";
import { handleResetPasswordAPI, handleUpdateImage,handleUpdateText} from "./user.helpers";

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
  try{
    yield handleUpdateImage(payload)
    
    // yield put(
    //   fetchProductsStart()
    // );

  }catch(err){
    //console.log(err)
  }
}

export function* onUpdateImageStart (){
  yield takeLatest(userTypes.UPDATE_IMAGE_START, updateImage);
}


export function* updateText ({payload}) {
  try{
   yield handleUpdateText(payload)
    
    // yield put(
    //   fetchProductsStart()
    // );

  }catch(err){
    //console.log(err)
  }
}

export function* onUpdateTextStart (){
  yield takeLatest(userTypes.UPDATE_TEXT_START, updateText);
}


// export function* addImage ( {payload}) {
 
 
  
//   try{
//     const timestamp = new Date();

//     yield handleAddImage({
//       ...payload,
//       studentUID: auth.currentUser.uid,
//       createdDate: timestamp
//     });
//     // yield put(
//     //   fetchProductsStart()
//     // );

//   } catch (err){
//     //  console.log(err);
//   }
// }

// export function* onAddImageStart () {
//  yield takeLatest (userTypes.ADD_NEW_IMAGE_START,addImage)
// } 


// export function* deleteImage({payload}) {
//   try {
//     yield handleDeleteImage(payload);
//     // yield put (
//     //   fetchProductsStart()
//     // );

//   } catch (err) {
//     // console.log(err);
//   }
// }


// export function* onDeleteImageStart() {
//   yield takeLatest(userTypes.DELETE_IMAGE_START, deleteImage);
// }
  export default function* userSagas() {
      yield all([call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onResetPasswordStart),
        call(onUpdateImageStart),
        call(onUpdateTextStart),
        
      ])
  }