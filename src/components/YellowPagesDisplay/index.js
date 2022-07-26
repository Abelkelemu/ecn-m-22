import React from 'react';
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersStart } from '../../redux/User/user.actions';
import './styles.scss'

// actions


// components

import Yellowpage from './YellowPage';

// assets


const mapState = ({imagesData, user}) => ({
    sImages : imagesData.images,
    percentage: imagesData.percentage,
    currentUser: user.currentUser
})



const YellowPagesDisplay = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            fetchAllUsersStart()
        )
    },[])
    
    return ( 

       <div>
        <Yellowpage/>
        hey abel</div>
       
    );
}
 
export default YellowPagesDisplay;