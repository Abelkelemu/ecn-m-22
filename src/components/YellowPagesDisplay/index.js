import React from 'react';
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersStart } from '../../redux/User/user.actions';
import './styles.scss'

// actions


// components

import Yellowpage from './YellowPage';

// assets


const mapState = ({user}) => ({
    allStudents: user.allStudents
})



const YellowPagesDisplay = () => {

    const dispatch = useDispatch();
    const {allStudents} = useSelector(mapState)
    const {data} = allStudents;


    useEffect(() => {
        dispatch(
            fetchAllUsersStart()
        )
    },[])
    if(!Array.isArray(data)) return null;
    if(data.length< 1){
        return (
            <div className="img-grid">
                No data found.
            </div>
        )
    }
    
    return ( 

        <div className='yellowPagePreview'>

            <h1>Contact Details</h1>
            <div className="yellowPagePreviewResults">
  
          

            {data.map((yellowPageData,pos)=>{
                const {firstName,
                     lastName,
                     yellowpageimgThumbnail,
                     emailAddress,
                     phoneNumber,
                     instagramUsername,
                     facebookUsername
                    } = yellowPageData;
               // if(!storyImageThumbnail) return null;
                const configImage = {
                    firstName,
                    lastName,
                    yellowpageimgThumbnail,
                    emailAddress,
                    phoneNumber,
                    instagramUsername,
                    facebookUsername
                } 
                return(
                    <Yellowpage {...configImage}/>
                );
            })}
          </div>
        

        </div>
       
    );
}
 
export default YellowPagesDisplay;