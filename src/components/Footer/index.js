import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = props => {
  return (

    <footer className="footer">
      <div className="footerWrap">

        <div className="socialMedia">
              <a href="https://www.instagram.com/abel_kd_/" >Contact me</a> 
              <a href="https://www.instagram.com/abel_kd_/">
              <span className="instaFooterIcon">
                <i class="fab fa-instagram"></i>
              </span>
              
              
              </a>          
        </div>
        
        <Link to="/">
          <div className="copyright" >
            <p>Designed by Abel K Dessalegne</p> 
            © 2022 ECN-M-22
          </div>
        </Link>
    
        
      </div>
    </footer>
  );
}

export default Footer;