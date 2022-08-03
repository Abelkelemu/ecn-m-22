import React from 'react';
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersStart } from '../../redux/User/user.actions';
import './styles.scss'
import YearbookDesign from './YearbookDesign';

// actions


// components



// assets
import hat from '../../assets/hat.png'
import hat2 from '../../assets/hat2.png'


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

        <div className="fullDesign">
            <div className="hat"><img src={hat} alt="" /></div>
            <div className="hat2"><img src={hat2} alt="" /></div>
           
        <div className='yearbookPreview'>


<h1>Class of 2022 </h1>
<h2>congratulations!</h2>
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
        </div>

       
    );
}
 
export default StudentsYearbook;