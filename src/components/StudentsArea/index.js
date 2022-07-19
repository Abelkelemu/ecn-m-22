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
import ProgressBar from '../ProgressBar';

//actions
import { updateImageStart, updateTextStart, fetchUserStart } from '../../redux/User/user.actions';
import { addImageStart } from '../../redux/Images/images.actions';



const mapState = ({user}) => ({
  currentUser: user.currentUser,
  userPercentage: user.userPercentage,
  student: user.student
});

const StudentsArea = props => {

    const dispatch = useDispatch();
    const {currentUser, student, userPercentage } = useSelector(mapState);
    const inputRef = React.useRef();
    const {id } = currentUser;
    const { yearbookimgOneThumbnail} = student;

    const [hideModal, setHideModal] = useState(true);
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

    const handleSubmit2 = e => {
        e.preventDefault();
        dispatch(
          updateTextStart({
            id ,
            field :'yearbookimgOneThumbnail',
            newText: ''
          })  
        )
    }

      // const handleSubmit3 = e => {
      //   e.preventDefault();
      //   dispatch(
      //     addImageStart({image})  
      //       )
      //    resetForm();
      // }

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
    
    
    useEffect(() => {

        dispatch(
            fetchUserStart(id)
        )
    },[yearbookimgOneThumbnail])


    return (
 
        <div className='accountWrap'>
         
            <h1>Yearbook</h1>          
            {userPercentage>0 && <ProgressBar percentage = {userPercentage}/>}
            {yearbookimgOneThumbnail? <img src={yearbookimgOneThumbnail} alt="" /> : <img src ={uploadImg} onClick={() => toggleModal()} />}
     
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

            <i class="fa fa-trash-alt" aria-hidden="true" onClick={handleSubmit2}></i>
            <i class="fa fa-edit" aria-hidden="true" onClick={() => toggleModal()}></i>
                
            <h1>Yellow Page</h1>
        </div>

  
    )
};

export default StudentsArea;
