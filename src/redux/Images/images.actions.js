import imagesTypes from "./images.types";

export const addImageStart = imageData => ({
    type: imagesTypes.ADD_NEW_IMAGE_START,
    payload: imageData
  });
  
export const setPercentage = percentage => ({
  type: imagesTypes.SET_PERCENTAGE,
  payload: percentage
})

export const deleteImageStart = urlName => ({
  type: imagesTypes.DELETE_IMAGE_START,
  payload: urlName
});
  
export const fetchStoryImagesStart = (filters = {}) => ({
  type: imagesTypes.FETCH_STORY_IMAGES_START,
  payload: filters
  
});

export const setStoryImages = storyImage => ({
  type: imagesTypes.SET_STORY_IMAGES,
  payload: storyImage
});
