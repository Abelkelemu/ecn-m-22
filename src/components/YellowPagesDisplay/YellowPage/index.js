import yellowp from './../../../assets/yellowp.png'
const Yellowpage = (props) => {

  const {firstName,
         lastName,
         yellowpageimgThumbnail,
         emailAddress,
         phoneNumber,
         instagramUsername,
         facebookUsername
        } = props;
  

    return ( 
      <div className="studentPreview">

        <div className="thumb">
          <img src={yellowpageimgThumbnail? yellowpageimgThumbnail: yellowp} alt='' /> 
        </div>   

        <div className="details">
          <ul>

            {firstName && lastName && (
              <li>
                <span className="name">
                  {firstName && firstName.charAt(0).toUpperCase()+firstName.slice(1)} {lastName && lastName.charAt(0).toUpperCase()+lastName.slice(1)}
                </span>
            </li>
            )}

            {emailAddress && emailAddress && (
              <li>
                <span className="emailAddress">
                 {emailAddress &&  emailAddress.charAt(0).toUpperCase()+emailAddress.slice(1)}
                </span>
            </li>
            )}

            {phoneNumber && phoneNumber && (
              <li>
                <span className="phoneNumber">
                  {phoneNumber}
                </span>
            </li>
            )}

            {instagramUsername && instagramUsername && (
              <li>
                <a title= "Instagram" href={"https://www.instagram.com/"+ instagramUsername +"/"} >
                  <span className="instaIcon">
                    <i className="fab fa-instagram"></i>
                  </span>
            
                <span className="instagramUsername">    
                  {instagramUsername}
                </span>
                </a> 
                
            </li>
            )}

            {facebookUsername && facebookUsername && (
              <li>

                <a title="Facebook" href={"https://www.facebook.com/" + facebookUsername}>
                    <span className="facebookIcon">
                       <i className="fab fa-facebook-f"></i>
                    </span>
                
                    <span className="facebookUsername">
                      {facebookUsername}
                    </span>
                </a>
                
            </li>
            )}

          </ul>
        </div>     
      </div>   
    );
}
export default Yellowpage;