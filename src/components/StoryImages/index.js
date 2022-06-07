import React from 'react';
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryImagesStart, addImageStart } from "../../redux/Images/images.actions";
import Modal from "../Modal";
import LoadMore from "../LoadMore";
import Image from "./Image";
import './styles.scss'
const mapState = ({imagesData, user}) => ({
    sImages : imagesData.images,
    currentUser: user.currentUser
})



const StoryImages = () => {

    const {sImages, currentUser} = useSelector(mapState)
    const dispatch = useDispatch();
    const {data, queryDoc ,isLastPage} = sImages;

    const [hideModal, setHideModal] = useState(true);
    const inputRef = React.useRef();
    const [image, setImage] = useState(null);
    const [imagePreview, setimagePreview] = useState();
    const [error,setError] = useState('');
    
    const {
        id , 
        yearbookimgOneThumbnail
     } = currentUser
    
    // useEffect(() => {
    //     dispatch(
    //         fetchStoryImagesStart()
    //     )
    // },[currentUser])

    useEffect(() => {
        dispatch(
            fetchStoryImagesStart()
        )
    },[])
    
    const triggerFileSelectPopup = (e) => {
        e.preventDefault()
        inputRef.current.click();
      }

    const handleLoadMore = () => {
        dispatch(
            fetchStoryImagesStart({
                startAfterDoc : queryDoc,
                persistImages: data
            })
        )
    }
    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    }


    if(!Array.isArray(data)) return null;
    if(data.length<1){
        return (
            <div className="images">
                No image found.
            </div>
        )
    }
    return ( 

        <div className="preview">
            {currentUser && id }
            <h1>Story Book </h1>
                <div className="images">
            
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
            {!isLastPage && (<LoadMore {...configLoadMore}/>)}
            
        </div>
        
     );
}
 
export default StoryImages;