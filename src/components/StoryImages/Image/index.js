import ImageModal from "../../ImageModal";
import { useState } from "react";
import { motion } from "framer-motion";


const Image = ({storyImageThumbnail}) => {

   const [hideModal, setHideModal] = useState(true);
   const toggleModal = () => setHideModal(!hideModal);

   const configModal = {
      hideModal,
      toggleModal,
    };
    
    if(!storyImageThumbnail) return null;
    return ( 
       <div className="imgPreview">

            <ImageModal {...configModal}>
                <motion.img src= {storyImageThumbnail}
                     initial={{y:"-100vh"}}
                     animate={{y:0}}
                />
            </ImageModal>
            
           <motion.div className="img-wrap"
               layout
               whileHover={{opacity:1}}
           >
              <motion.img src={storyImageThumbnail} alt="StoryBook" onClick={() => toggleModal()}
               initial={{opacity:0}}
               animate={{opacity:1}}
               transition={{delay:1}}
              />      
           </motion.div>
       </div>
      
       
      //   <div className="image">
      //      <div className="thumb">
      //       <img src={storyImageThumbnail} alt="StoryBook" />
      //      </div>
      //   </div>
     );
}
 
export default Image;