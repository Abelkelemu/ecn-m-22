import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import './styles.scss'
import 'react-phone-number-input/style.css'

//assets
import uploadImg from '../../assets/uploadImg.PNG'

// components
import Button from '../forms/Button';
import Modal from '../Modal';
import FormInput from '../forms/FormInput';
import ProgressBar from '../ProgressBar';

//actions
import { updateImageStart, updateTextStart, fetchUserStart,  } from '../../redux/User/user.actions';




const mapState = ({user}) => ({
  currentUser: user.currentUser,
  userPercentage: user.userPercentage,
  student: user.student
});

const StudentsArea = () => {

    const dispatch = useDispatch();
    const inputRef = React.useRef();
    const {currentUser, student, userPercentage } = useSelector(mapState);
    const {id } = currentUser;
    const { yearbookimgOneThumbnail, yellowpageimgThumbnail,firstName,lastName,phoneNumber,emailAddress,instagramUsername,facebookUsername,yearbookQuote} = student;
    const [hideModal, setHideModal] = useState(true);
    const [hideModal2, setHideModal2] = useState(true);
    const [hideModal3, setHideModal3] = useState(true);
    const [hideModal4, setHideModal4] = useState(true);
    const [image, setImage] = useState(null);
    const [imagePreview, setimagePreview] = useState();
    const [error,setError] = useState('');
    const [fN,setFN] = useState(firstName);
    const [lN,setLN] = useState(lastName);
    const[ybQ, setYbQ] = useState(yearbookQuote);
    const[eA, setEA] = useState(emailAddress);
    const[pN, setPN] = useState(phoneNumber);
    const[igU, setIgU] = useState(instagramUsername);
    const[fbU, setFbU] = useState(facebookUsername);
    const[fPic, setFPic] = useState(true);
    const[sPic, setSPic] = useState(true);

   
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

    const toggleModal3 = () => {
      setHideModal3(!hideModal3)
      setFN(firstName);
      setLN(lastName);
      setEA(emailAddress)
      setPN(phoneNumber)
      setIgU(instagramUsername)
      setFbU(facebookUsername)
    }
    
    const toggleModal4 = () => {
      setHideModal4(!hideModal4)
      setimagePreview()
      setImage(null)
      setError('')
    };
      
    const resetForm = () =>{
      setHideModal(true);
      setHideModal3(true);
      setHideModal4(true)
      setimagePreview();
      setImage(null);
      setError('');
      
    }

    const configModal = {
        hideModal:hideModal,
        toggleModal:toggleModal,
    };

    const configModal2 = {
      hideModal: hideModal2,
      toggleModal : toggleModal2,
    };

    
    const configModal3 = {
      hideModal: hideModal3,
      toggleModal : toggleModal3,
    };

    const configModal4 = {
      hideModal: hideModal4,
      toggleModal : toggleModal4,
    };
   
    const handleSubmitYearbookPhoto = e => {
        e.preventDefault();
        setFPic(true);
        setSPic(false);
        dispatch(
          updateImageStart({
            id ,
            image,
            field :'yearbookimgOneThumbnail',
            storageFolder : 'yearbook-images-one',
            urlName: yearbookimgOneThumbnail
          })  
        )
        resetForm();
    }

    const handleSubmitDeleteYearbookPhoto = e => {
        e.preventDefault();
        dispatch(
          updateTextStart({
            id ,
            field :'yearbookimgOneThumbnail',
            newText: '',
            urlName: yearbookimgOneThumbnail
          })  
        )
    }

    const handleSubmitEditYearbookData = e => {
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

    
       
    const handleSubmitYellowPagePhoto = e => {
      e.preventDefault();
      setFPic(false);
      setSPic(true);
      dispatch(
        updateImageStart({
          id ,
          image,
          field :'yellowpageimgThumbnail',
          storageFolder : 'yellow-page-images',
          urlName: yellowpageimgThumbnail,
        })  
      )
      resetForm();
  }

   const handleSubmitDeleteYellowPagePhoto = e => {
        e.preventDefault();
        dispatch(
          updateTextStart({
            id ,
            field :'yellowpageimgThumbnail',
            newText: '',
            urlName: yellowpageimgThumbnail
          })  
        )
    }

    const handleSubmitEditYellowPageData = e => {
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
          field :'emailAddress',
          newText: eA
        })  
      )
      dispatch(
        updateTextStart({
          id ,
          field :'phoneNumber',
          newText: pN
        })  
      )
      dispatch(
        updateTextStart({
          id ,
          field :'instagramUsername',
          newText: igU
        })  
      )
      dispatch(
        updateTextStart({
          id ,
          field :'facebookUsername',
          newText: fbU
        })  
      )
      setHideModal3(true);
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
          
          <h1>Yearbook Data</h1>
          <div className="yearbookImgWrap">

            {fPic && userPercentage>0 && <ProgressBar percentage = {userPercentage}/>}
            {yearbookimgOneThumbnail? <img src={yearbookimgOneThumbnail} alt="" /> : <img src ={uploadImg} onClick={() => toggleModal()} />}
           
            <div className="icons">

              <div className="deleteIcon">
                <i title="Delete Picture" className="fa fa-trash-alt" aria-hidden="true" onClick={handleSubmitDeleteYearbookPhoto}></i>
              </div>

              <div className="editIcon">
                <i title = "Edit Picture" className="fa fa-edit" aria-hidden="true" onClick={() => toggleModal()}></i>
              </div>

            </div>

            
            <Modal {...configModal}>

              <div className="updateYearbookImg">
              
                <form onSubmit = {handleSubmitYearbookPhoto}>                
              
                  <label htmlFor="yearbookImage"><h2>Yearbook Photo</h2></label>
              
                    <Button onClick={triggerFileSelectPopup}>
                     Choose an image
                    </Button>
                    <h3>{error && error}</h3>
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

                    <Button onClick={() => {setHideModal(true); resetImage(); setError('')} }>
                      Cancel
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
                   <i title="Edit Texts "className="fa fa-edit" aria-hidden="true" onClick={() => toggleModal2()}></i>
              </div>

              <Modal {...configModal2}>
                  <form onSubmit={handleSubmitEditYearbookData}>
                    First Name
                    <FormInput
                      type= "text"
                      name="fN"
                      value={fN || ''}
                      placeholder={firstName}
                      handleChange = {e => setFN(e.target.value)}
                      />
                      Last Name
                      <FormInput
                      type= "text"
                      name="lN"
                      value={lN || ''}
                      placeholder={lastName}
                      handleChange = {e => setLN(e.target.value)}
                      />
                      Yearbook Quote
                      <FormInput
                      type= "text"
                      name="ybQ"
                      value={ybQ || ''}
                      placeholder={yearbookQuote}
                      handleChange = {e => setYbQ(e.target.value)}
                      />
                      <Button type= "submit" >
                        Submit
                      </Button>
                     <br />
                      <Button onClick={() => {setHideModal2(true)}}>
                          Cancel
                      </Button>
                  </form>
              </Modal>

          </div>
           
          <h1>Yellow Pages Data</h1>
          <div className="yearbookImgWrap">

            {sPic && userPercentage>0 && <ProgressBar percentage = {userPercentage}/>}
            {yellowpageimgThumbnail? <img src={yellowpageimgThumbnail} alt="" /> : <img src ={uploadImg} onClick={() => toggleModal4()} />}
           
            <div className="icons">
              <div className="deleteIcon">
                <i title="Delete Picture" className="fa fa-trash-alt" aria-hidden="true" onClick={handleSubmitDeleteYellowPagePhoto}></i>
              </div>
              <div className="editIcon">
                <i title = "Edit Picture" className="fa fa-edit" aria-hidden="true" onClick={() => toggleModal4()}></i>
              </div>
            </div>

            
            <Modal {...configModal4}>

              <div className="updateYearbookImg">
              
                <form onSubmit = {handleSubmitYellowPagePhoto}>                
              
                  <label htmlFor="yellowPageImg"><h2>Yellow Pages Photo</h2></label>
              
                    <Button onClick={triggerFileSelectPopup}>
                     Choose an image
                    </Button>
                    <h3>{error && error}</h3>
                    <input 
                      type="file" 
                      name="yellowPageImg"
                      className="yellowPageImgInput" 
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

                    <Button onClick={() => {setHideModal4(true); resetImage()}}>
                      Cancel
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
                  Email Address: {emailAddress && emailAddress}
                  
                </li>
                <li>
                  Phone Number: {phoneNumber && phoneNumber}
                  
                </li>
                <li>
                  Instagram Username: {instagramUsername && instagramUsername}
                </li>

                <li>
                  Facebook Username: {facebookUsername && facebookUsername}
                </li>
              </ul>
              
              <div className="iconTextEdit">
                   <i title="Edit Texts "className="fa fa-edit" aria-hidden="true" onClick={() => toggleModal3()}></i>
              </div>
              <br />
              <Modal {...configModal3}>
                  <form onSubmit={handleSubmitEditYellowPageData}>
                    First Name
                    <FormInput
                      type= "text"
                      name="fN"
                      value={fN || ''}
                      placeholder={firstName}
                      handleChange = {e => setFN(e.target.value)}
                      />
                      Last Name
                      <FormInput
                      type= "text"
                      name="lN"
                      value={lN || ''}
                      placeholder={lastName}
                      handleChange = {e => setLN(e.target.value)}
                      />
                    Email Address
                    <FormInput
                      type= "email"
                      name="fN"
                      value={eA || ''}
                      placeholder={emailAddress}
                      handleChange = {e => setEA(e.target.value)}
                      />
                      Phone Number
              
                      <PhoneInput
                      className='phoneInput'
                        placeholder = {phoneNumber}
                        value={pN || ''}
                        onChange={setPN}/>
                      
                      Instagram Username
                      <FormInput
                      type= "text"
                      name="ybQ"
                      value={igU || ''}
                      placeholder={instagramUsername}
                      handleChange = {e => setIgU(e.target.value)}
                      />
                      Facebook Username
                      <FormInput
                      type= "text"
                      name="ybQ"
                      value={fbU || ''}
                      placeholder={facebookUsername}
                      handleChange = {e => setFbU(e.target.value)}
                      />
                      <Button type= "submit">
                        Submit
                      </Button>
                        <br />
                      <Button onClick={() => {setHideModal3(true)}}>
                          Cancel
                      </Button>
                  </form>
              </Modal>

          </div>
   
        </div>
  
    )
};

export default StudentsArea;
