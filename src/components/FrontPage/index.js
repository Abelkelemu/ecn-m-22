import { useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './styles.scss';

// actions
import { fetchStoryImagesStart } from "../../redux/Images/images.actions";

// components
import LoadMore from "../LoadMore";

// assets
import imgUpload from "./../../assets/uploadImg.PNG"

// UI
import { AnimatePresence, motion } from "framer-motion";

const mapState = ({imagesData}) => ({
    sImages : imagesData.images

})

const FrontPage = props => {

    const dispatch = useDispatch();
    const {sImages} = useSelector(mapState);
    const {data, queryDoc} = sImages;
    
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
            <h1>Ecole Centrale de Nantes - Mauritius Batch 2022 </h1>

            <div className="wrap">

                <div className="frontPageContent">
                    <h1 className="bigTitle">ECN-M-22</h1>
                    
                    <p> "Congratulations! We made it! It's time to celebrate all the hard work that led to this joyful occasion.</p>
                    <p> The road to graduation was a long, steep climb, so let us take a moment at the summit to be proud of our accomplishments. Embrace the warm memories of the past and big dreams for the future. It’s only up from here!" </p>
                    <h2 className="credit">Wishes from Zelalem Bogale</h2>
                    <p>This website will hold our photos, contacts and memories till the end of time. It holds our legacy in ECN Mauritius ✊</p>
                    <h2 className="credit">Designed by Abel Dessalegne</h2>
                </div> 

                <div className="slideShow">

                    <div className="slideShowImage">
                        
                        {data.length ===0 && <img src={imgUpload} alt="Upload Image" />}
                        
                        {data.length ===1 && data.map((sImage,pos)=>{
                            const {storyImageThumbnail} = sImage;
                            if(!storyImageThumbnail) return null;
                            return(
                                <AnimatePresence exitBeforeEnter key={pos}>
                                    <motion.img src={storyImageThumbnail} alt="STORYBOOK" 
                                        initial={{x:"-20vh",opacity:0}}
                                        animate={{x:0,opacity:1}}
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
