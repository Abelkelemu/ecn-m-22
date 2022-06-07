
const Image = ({storyImageThumbnail}) => {

    if(!storyImageThumbnail) return null;
    return ( 
        <div className="image">
           <div className="thumb">
            <img src={storyImageThumbnail} alt="StoryBook" />
           </div>
        </div>
     );
}
 
export default Image;