import { useState } from "react";
import { useSelector } from "react-redux";
// components
import ImageModal from "../../ImageModal";

//UI
import { motion } from "framer-motion";
import { deleteImageStart } from "../../../redux/Images/images.actions";
import { getCurrentUser } from "../../../firebase/utils";
import { useDispatch } from "react-redux";


const mapState = ( {user}) => ({
  
  currentUser: user.currentUser,
  
})
const Image = ({storyImageThumbnail, documentID, studentUID}) => {

    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);

   const [hideModal, setHideModal] = useState(true);
   const toggleModal = () => setHideModal(!hideModal);

   const configModal = {
      hideModal,
      toggleModal,
    };

    
    const handleSubmitDeleteStorybookImage = e => {
        e.preventDefault();
        dispatch(
          deleteImageStart({
            urlName: storyImageThumbnail,
            documentID: documentID,
            studentUID: studentUID
          })  
        )
    }
 

    
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
               {currentUser && currentUser.id===studentUID && <div className="deleteIcon">
                <i title="Delete Picture" className="fa fa-trash-alt" aria-hidden="true" onClick={handleSubmitDeleteStorybookImage} ></i>
              </div>}
              
           </motion.div>
       </div>
      
       

     );
}
 
export default Image;