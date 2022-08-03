import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const YearbookDesign = (props) => {

  const {firstName,
         lastName,
         yearbookimgOneThumbnail,
         yearbookQuote
        } = props;
  

    return ( 
      <div className="studentsYearbookPreview">
        <div className="yearbookThumb">
          <img src={yearbookimgOneThumbnail} alt='' /> 
        </div>   

        <div className="yearbookDetails">
          <ul>

            {firstName && lastName && (
              <li>
                <span className="name">
                  {firstName.charAt(0).toUpperCase()+firstName.slice(1)} {lastName.charAt(0).toUpperCase()+lastName.slice(1)}
                </span>
            </li>
            )}

            {yearbookQuote && yearbookQuote && (
              <li>
                <span className="emailAddress">
                 "{yearbookQuote.charAt(0).toUpperCase()+yearbookQuote.slice(1)}"
                </span>
            </li>
            )}
          </ul>
        </div>     
     </div>   
       
  
     );
}
 
export default YearbookDesign;