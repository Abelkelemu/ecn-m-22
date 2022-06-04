import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {CKEditor}  from 'ckeditor4-react';
import './styles.scss'

//assets
import uploadImg from '../../assets/uploadImg.PNG'
// components

import Button from '../forms/Button';
import Modal from '../Modal';
import FormInput from '../forms/FormInput';

//actions
import { updateImageStart } from '../../redux/User/user.actions';

const mapState = ({user}) => ({
  currentUser: user.currentUser
});
const StudentsArea = props => {

  const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const inputRef = React.useRef();
    const {currentUser } = useSelector(mapState);
    const [image, setImage] = useState(null);
    const [imagePreview, setimagePreview] = useState();
    const [error,setError] = useState('');
   // const [tempoID, setTempoID] = useState('');
    
    const resetImage = () => setImage(null);
    
    const triggerFileSelectPopup = (e) => {
        e.preventDefault()
        inputRef.current.click();
      }

    const toggleModal = () => setHideModal(!hideModal);
   
    const resetForm = () =>{
      setHideModal(true);
    // setTempoID()
      setimagePreview()
      setImage(null)
      
    }
    const configModal = {
        hideModal,
        toggleModal,
      };
     
      const {id} = currentUser;
      
      const handleSubmit = e => {
        e.preventDefault();
        dispatch(
          updateImageStart({
            id ,
            image,
            field :'yearbookimgOneThumbnail',
            storageFolder : 'yearbook-images-one'
          })  
            )
        resetForm();
      }

    const types = ['image/png', 'image/jpeg', 'image/jpg']; 
    
    const ImgHandler = (e) => {

        let selectedFile = e.target.files[0];
       // let selectedFileSize = e.target.files[0].size;
      
        if (selectedFile && types.includes(selectedFile.type)) {        
            setImage(selectedFile);
            setError('')
            setimagePreview(URL.createObjectURL(selectedFile));  
        }
        else {
            setError('Please select a valid image type (jpg , jpeg or png)');
        }
    } 
    return (
 
        <div>
          
            <h1>Yearbook</h1>


                <Button onClick={() => toggleModal()}>
                    Add an image
                </Button>
                <Modal {...configModal}>
            <div className="updateProductImage">

          
<form onSubmit = {handleSubmit}>

 
 <label htmlFor="yearbook-small-image"><h2>Image One</h2></label>

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
       Finish
     </Button>

     <Button onClick={() => {setHideModal(true); resetImage()}}>
       Close
     </Button>

</form>

</div>

                </Modal>
                <br />
                <Button>
                    Delete Image
                </Button>
                <br />
                <Button>
                    Update Image
                </Button>
            
            <h1>Yellow Page</h1>

            <Button>
                    Add  an Image
                </Button>
                <br />
                <Button>
                    Delete Image
                </Button>
                <br />
                <Button>
                    Update Image
                </Button>
        </div>
    )
};

export default StudentsArea;
