import userTypes from "./user.types";

export const emailSignInStart = userCredentials => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
  });

  export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
  });

export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION
});

export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
  });
  
  export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
  });
  
  export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload: err
  });

  export const signInError = err => ({
    type: userTypes.SIGN_IN_ERROR,
    payload: err
  });
  
  export const resetPasswordStart = userCredentials => ({
    type: userTypes.RESET_PASSWORD_START,
    payload: userCredentials
  });
  
  export const resetPasswordSuccess = () => ({
    type: userTypes.RESET_PASSWORD_SUCCESS,
    payload: true
  });
  
  export const resetUserState = () => ({
    type: userTypes.RESET_USER_STATE
  });

  export const updateImageStart = requirements => ({
      type: userTypes.UPDATE_IMAGE_START,
      payload: requirements
  })

  export const updateTextStart = requirements => ({
    type: userTypes.UPDATE_TEXT_START,
    payload: requirements
})


export const fetchUserStart = uID => ({
  type: userTypes.FETCH_USER_START,
  payload: uID,
})


export const setUser = user => ({
  type: userTypes.SET_USER,
  payload: user
});


export const fetchAllUsersStart = () => ({
  type: userTypes.FETCH_ALL_USERS_START,
})


export const setAllUsers = users => ({
  type: userTypes.SET_ALL_USERS,
  payload: users
});
// export const addImageStart = imageData => ({
//   type: userTypes.ADD_NEW_IMAGE_START,
//   payload: imageData
// });

// export const deleteImageStart = imageID => ({
//   type: userTypes.DELETE_IMAGE_START,
//   payload: imageID
// });
