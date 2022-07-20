import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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




const mapState = ({user}) => ({
  currentUser: user.currentUser,
  userPercentage: user.userPercentage,
  student: user.student
});

const StudentsArea = props => {

    const dispatch = useDispatch();
    const inputRef = React.useRef();
    const {currentUser, student, userPercentage } = useSelector(mapState);
    
    const {id } = currentUser;
    const { yearbookimgOneThumbnail, yellowpageimgThumbnail,firstName,lastName,phoneNumber,emailAddress,instagramUsername,facebookUsername,yearbookQuote} = student;

    const [hideModal, setHideModal] = useState(true);
    const [hideModal2, setHideModal2] = useState(true);

    const [image, setImage] = useState(null);
    const [imagePreview, setimagePreview] = useState();

    const [error,setError] = useState('');

    const [fN,setFN] = useState(firstName);
    const [lN,setLN] = useState(lastName);
    const[ybQ, setYbQ] = useState(yearbookQuote);
   
   
    useEffect(() => {
        dispatch(
            fetchUserStart(id)
        )
    },[])

    const resetImage = () => setImage(null);
    
    const triggerFileSelectPopup = (e) => {
        e.preventDefault()
        inputRef.current.click();
    }

    const toggleModal = () => {
      setHideModal(!hideModal)
      setimagePreview()
      setImage(null)
    };
      
    const toggleModal2 = () => {
      setHideModal2(!hideModal2)
      setFN(firstName);
      setLN(lastName);
      setYbQ(yearbookQuote);
    }
    
    const resetForm = () =>{
      setHideModal(true);
      setimagePreview()
      setImage(null)
      
    }

    const configModal = {
        hideModal:hideModal,
        toggleModal:toggleModal,
    };

    const configModal2 = {
      hideModal: hideModal2,
      toggleModal : toggleModal2,
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

    const handleSubmit3 = e => {
      e.preventDefault();
      dispatch(
        updateTextStart({
          id ,
          field :'firstName',
          newText: fN
        })  
      )
      dispatch(
        updateTextStart({
          id ,
          field :'lastName',
          newText: lN
        })  
      )
      dispatch(
        updateTextStart({
          id ,
          field :'yearbookQuote',
          newText: ybQ
        })  
      )
      setHideModal2(true);
  }

    const types = ['image/png', 'image/jpeg', 'image/jpg']; 
    
    const ImgHandler = (e) => {

        let selectedFile = e.target.files[0];     
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
 
        <div className='StudentAreaWrap'>

          <div className="yearbookImgWrap">

            <h1>Yearbook</h1>  
            {userPercentage>0 && <ProgressBar percentage = {userPercentage}/>}
            {yearbookimgOneThumbnail? <img src={yearbookimgOneThumbnail} alt="" /> : <img src ={uploadImg} onClick={() => toggleModal()} />}
           
            <div className="icons">
              <div className="deleteIcon">
                {userPercentage==0 && <i title="Delete Picture" className = "deleteIcon"class="fa fa-trash-alt" aria-hidden="true" onClick={handleSubmit2}></i>}
              </div>
              <div className="editIcon">
                {userPercentage == 0 && <i title = "Edit Picture" class="fa fa-edit" aria-hidden="true" onClick={() => toggleModal()}></i>}
              </div>
            </div>

            
            <Modal {...configModal}>

              <div className="updateYearbookImg">
              
                <form onSubmit = {handleSubmit}>                
              
                  <label htmlFor="yearbookImage"><h2>Yearbook Photo</h2></label>
              
                    <Button onClick={triggerFileSelectPopup}>
                     Choose an image
                    </Button>
              
                    <input 
                      type="file" 
                      name="yearbookImage"
                      className="yearbookImgInput" 
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
            
          </div>
          
          <div className="yearbookInfo">
              <ul>
                <li>
                  First Name: {firstName && firstName}
                  
                </li>
                <li>
                  Last Name: {lastName && lastName}
                  
                </li>
                <li>
                  Yearbook Quote: "{yearbookQuote && yearbookQuote}"
                  
                </li>
              </ul>
              
              <div className="iconTextEdit">
                   <i title="Edit First Name "class="fa fa-edit" aria-hidden="true" onClick={() => toggleModal2()}></i>
              </div>
              <Modal {...configModal2}>
                  <form onSubmit={handleSubmit3}>
                    First Name
                    <FormInput
                      type= "text"
                      name="fN"
                      value={fN}
                      placeholder={fN}
                      handleChange = {e => setFN(e.target.value)}
                      />
                      Last Name
                      <FormInput
                      type= "text"
                      name="lN"
                      value={lN}
                      placeholder={lN}
                      handleChange = {e => setLN(e.target.value)}
                      />
                      Yearbook Quote
                      <FormInput
                      type= "text"
                      name="ybQ"
                      value={ybQ}
                      placeholder={ybQ}
                      handleChange = {e => setYbQ(e.target.value)}
                      />
                      <Button type= "submit">
                        Submit
                      </Button>
                  </form>
              </Modal>

          </div>
           
            <h1>Yellow Page</h1>

            
        </div>

  
    )
};

export default StudentsArea;
