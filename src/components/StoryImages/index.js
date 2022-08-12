import React from 'react';
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.scss'

// actions
import { fetchStoryImagesStart, addImageStart } from "../../redux/Images/images.actions";

// components

import Modal from "../Modal";
import LoadMore from "../LoadMore";
import Image from "./Image";
import Button from '../forms/Button';
import ProgressBar from '../ProgressBar';

// assets
import uploadImg from'./../../assets/uploadImg.PNG'

const mapState = ({imagesData, user}) => ({
    sImages : imagesData.images,
    percentage: imagesData.percentage,
    currentUser: user.currentUser,
    student: user.student
})



const StoryImages = () => {

  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const {sImages, currentUser, percentage,student} = useSelector(mapState);
  const {data, queryDoc ,isLastPage} = sImages;
  const [hideModal, setHideModal] = useState(true);  
  const [image, setImage] = useState(null);
  const [imagePreview, setimagePreview] = useState();
  const [error,setError] = useState('');
 // const [full,setFull] = useState(false)

 useEffect(() => {
  dispatch(
    fetchStoryImagesStart({
      pageSize:12
    })
  )
 },[])
    
  const resetImage = () => setImage(null);
  const triggerFileSelectPopup = (e) => {
          e.preventDefault()
          inputRef.current.click();
  }
  const toggleModal = () => setHideModal(!hideModal);
  const resetForm = () =>{
      setHideModal(true);
      setimagePreview()
      setImage(null)
      setError('')
  }
  const configModal = {
      hideModal,
      toggleModal,
  };
     
  const handleSubmit = e => {
      e.preventDefault();
      dispatch(
      addImageStart({image})  
      )
      resetForm();
  }
    
  const types = ['image/png', 'image/jpeg', 'image/jpg']; 
  
  const ImgHandler = (e) => {

        let selectedFile = e.target.files[0];     
        if (selectedFile && types.includes(selectedFile.type)) {        
            setImage(selectedFile);
            setError('')
            setimagePreview(URL.createObjectURL(selectedFile));  
        }
        else {
            setError('Please select a valid image type (jpg , jpeg or png).');
        }
    }
  
  const handleLoadMore = () => {
    dispatch(
      fetchStoryImagesStart({
          startAfterDoc : queryDoc,
          persistImages: data,
          pageSize: 12
      })
   )   
      
  }
  
  const configLoadMore = {
      onLoadMoreEvt: handleLoadMore,
  }

  if(!Array.isArray(data) ) return null;
  if(data.length<1 && !currentUser){
      return (
           <div className="img-grid">
              No image found.
           </div>
      )
  }
   
     
    
  return ( 
      <div className="preview">
      
          <h1>Our Memories Are Countless... </h1>
          {percentage>0 && <ProgressBar percentage = {percentage}/>}
          {percentage===0 && currentUser && currentUser.count<5 && student.count!==5   && <span onClick={() => toggleModal()}>
              +
          </span>}
          {percentage===0 && currentUser && currentUser.count>=5 && currentUser.id=='MZN0XXPpERhy1Q6LPA8O6Q6zsQy1'   && <span onClick={() => toggleModal()}>
              +
          </span>}
          <div className="previewWrap"> 
            
            <div className="img-grid">
  
              <Modal {...configModal}>
                <div className="addStoryImage">
                  <form onSubmit = {handleSubmit}>
                    <label htmlFor="yearbook-small-image"><h2>Storybook Photo</h2></label>
                      <h3>{error && error}</h3>
                      <Button onClick={triggerFileSelectPopup}>
                        Choose an image
                      </Button>
                      <input 
                        type="file" 
                        name="yearbook-small-image"
                        className="imgoneinput" 
                        onChange={ImgHandler} 
                        ref ={inputRef} 
                        style={{display:"none"}}
                      />

                      <div className="wrap">
                        <div className="image-container">
                            {
                              image  ? <img   src={imagePreview} ></img> : <img onClick={triggerFileSelectPopup} src={uploadImg}/> 
                            }
                        </div>
                      </div> 

                      <Button type='submit' className="btn">
                          Confirm
                      </Button>

                      <Button onClick={() => {setHideModal(true); resetImage(); setError('')}}>
                          Cancel
                      </Button>
        
                  </form>
                </div>
              </Modal>

              {data.map((sImage,pos)=>{
                  const {storyImageThumbnail} = sImage;
                  if(!storyImageThumbnail) return null;
                  const configImage = {
                      storyImageThumbnail
                  } 
                  
                  return(
                    
                      <Image {...configImage}/>
                  );
              })}
            </div>

            <div className="loadMoreBtn">
              {!isLastPage && (<LoadMore {...configLoadMore}/>)}
            </div>
          </div>
      </div>
 );
}
export default StoryImages;