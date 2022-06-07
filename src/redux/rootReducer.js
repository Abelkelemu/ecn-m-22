import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import imagesReducer from "./Images/images.reducer";

export default combineReducers({
    user: userReducer,
    imagesData: imagesReducer 
})

