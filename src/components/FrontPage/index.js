import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryImagesStart } from "../../redux/Images/images.actions";
import LoadMore from "../LoadMore";
import './styles.scss';
import { motion } from "framer-motion";

const mapState = ({imagesData}) => ({
    sImages : imagesData.images

})

const FrontPage = props => {

    const dispatch = useDispatch();
    const {sImages} = useSelector(mapState);
    const {data, queryDoc ,isLastPage} = sImages;
    
    
    useEffect(() => {
        dispatch(
            fetchStoryImagesStart({
              pageSize:1
            })
        )
        
    },[])
    
    

    const handleLoadMore = () => {
        dispatch(
            fetchStoryImagesStart({
                startAfterDoc : queryDoc,
              // persistImages: data,
                pageSize: 1
            })
        )
    }
    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    }

    if(!Array.isArray(data)) return null;
    if(data.length<1 ){
        return (
            <div className="img-grid">
                No image found.
            </div>
        )
    }

    return (
        <div className="images">
            <h1>ECN-M-22 </h1>
            
                {data.length ==1 && data.map((sImage,pos)=>{
                const {storyImageThumbnail} = sImage;
                if(!storyImageThumbnail) return null;
                const configImage = {
                    storyImageThumbnail
                } 
                return(
                    
                    <motion.img src={storyImageThumbnail} alt="" style={{width:'400px', height: '400px'}}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:1}}

                    />
                );
            })} 
               <div className="loadMoreBtn">
        {!isLastPage && (<LoadMore {...configLoadMore}/>)}
        </div> 
        </div>
    )
};

export default FrontPage;
