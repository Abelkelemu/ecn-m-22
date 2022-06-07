import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryImagesStart } from "../../redux/Images/images.actions";
import LoadMore from "../LoadMore";
import './styles.scss';


const mapState = ({imagesData}) => ({
    storyImages : imagesData.images
})

const FrontPage = props => {

    const dispatch = useDispatch();
    const {storyImages} = useSelector(mapState);
   // const {data, queryDoc, isLastPage} = storyImages

    // useEffect(() => {
    //     dispatch(
    //         fetchStoryImagesStart()
    //     )
    // },[]);
    // if(Array.isArray(storyImages)) return null;

    // if(storyImages.length<1){
    //     return(
    //         <div className="images">
    //             No image found.
    //         </div>
    //     )
    // }

    // const handleLoadMore = () => {
    //     dispatch(
    //         fetchStoryImagesStart({
    //             startAfterDoc : queryDoc,
    //             persistImages: data
    //         })
    //     )
    // }
    // const configLoadMore = {
    //     onLoadMoreEvt: handleLoadMore,
    // }

    return (
        <div className="images">
            {/* {storyImages.map((image,pos)=>{
                const {storyImageThumbnail} = image;
                if(!storyImageThumbnail) return null;
                return(
                    <div key={pos}>
                        
                    </div>
                );
            })}
            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )} */}
            
        </div>
    )
};

export default FrontPage;
