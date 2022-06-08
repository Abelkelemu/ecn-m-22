import imagesTypes from "./images.types";

const INITIAL_STATE = {
      images: [],
    
      percentage : 0
};

const imagesReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case imagesTypes.SET_STORY_IMAGES:
            return{
                ...state,
                images: action.payload
            }
        case imagesTypes.SET_PERCENTAGE:
            return{
                ...state,
                percentage: action.payload
            }
        default:
            return state;
    };
}

export default imagesReducer;