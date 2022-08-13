import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = () => {
  return (

    <footer className="footer">
      <div className="footerWrap">
        <div className="socialMedia">
              <a href="https://www.instagram.com/abel_kd_/" >Contact me</a> 
              <a href="https://www.instagram.com/abel_kd_/">
                <span className="instaFooterIcon">
                  <i className="fab fa-instagram"></i>
                </span>
              </a>          
        </div>
        <div className="copyright" >
            <a href="https://www.instagram.com/abel_kd_/">
              <p>Designed by Abel K Dessalegne</p> 
            </a>
            <Link to="/">
               © 2022 ECN-M-22
            </Link>
          </div>
      </div>
    </footer>
  );
}

export default Footer;