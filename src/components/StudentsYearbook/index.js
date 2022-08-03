import React from 'react';
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersStart } from '../../redux/User/user.actions';
import './styles.scss'
import YearbookDesign from './YearbookDesign';

// actions


// components



// assets


const mapState = ({user}) => ({
    allStudents: user.allStudents
})



const StudentsYearbook = () => {

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

        <div className='yearbookPreview'>

            <h1>Yearbook</h1>
            <div className="yearbookResults">
  
          

            {data.map((yearbookData,pos)=>{
                const {firstName,
                     lastName,
                     yearbookimgOneThumbnail,
                     yearbookQuote
                    } = yearbookData;
               // if(!storyImageThumbnail) return null;
                const configImage = {
                    firstName,
                    lastName,
                    yearbookimgOneThumbnail,
                    yearbookQuote
                } 
                return(
                    <YearbookDesign {...configImage}/>
                );
            })}
          </div>
        

        </div>
       
    );
}
 
export default StudentsYearbook;