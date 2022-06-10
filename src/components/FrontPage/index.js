import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryImagesStart } from "../../redux/Images/images.actions";
import LoadMore from "../LoadMore";
import './styles.scss';
import { AnimatePresence, motion } from "framer-motion";
import imgTry from "./../../assets/uploadImg.PNG"
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
                startAfterDoc : queryDoc,
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
        dispatch(
            fetchStoryImagesStart({
                pageSize:1
            })
        )
    }

    return (
        <div className="frontPagePreview">
            <h1>Ecole Centrale de Nantes | Mauritius Batch 2022 </h1>
            <div className="wrap">

                 <div className="frontPageContent">
                     <h1>ECN-M-22?</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nobis rerum explicabo totam doloribus assumenda error maiores veniam facere porro repudiandae vitae dolores a, illum ullam architecto sunt odio excepturi.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nobis rerum explicabo totam doloribus assumenda error maiores veniam facere porro repudiandae vitae dolores a, illum ullam architecto sunt odio excepturi.</p>
                </div> 

                

                <div className="slideShow">

                    <div className="slideShowImage">
                        <Link to="/login">
                            {data.length ===0 && <img src={imgTry} alt="" />}
                        </Link>
                       
                        {data.length ===1 && data.map((sImage,pos)=>{
                            const {storyImageThumbnail} = sImage;
                            if(!storyImageThumbnail) return null;
                            
                            return(
                                
                                <AnimatePresence exitBeforeEnter>
                                    <motion.img src={storyImageThumbnail} alt="STORYBOOK" 
                                   initial={{x:"-20vh",opacity:0}}
                                   animate={{x:0,opacity:1}}
                                   // initial={{opacity:0}}
                                    // animate={{opacity:1}}
                                 transition={{delay:1}}
                                    key={storyImageThumbnail}
                                />
                                    
                                </AnimatePresence>
                                
                                
                            );
                        })
                      }
                    <div className="nextArrow">
                        <LoadMore {...configLoadMore} />
                    </div>
                 </div>
                 
                   
                </div>

              
        
            
                 
            </div>

           
       
       
        </div>
    )
};

export default FrontPage;
