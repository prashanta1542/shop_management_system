import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import HeaderforDeliveryprofile from "./header";
import PersoanlInfo from "./personalinfo";
import Footer from "../footer";
export default function DeliveryProfile(){
    const navigate=useNavigate();
    useEffect(()=>{
      if(!(localStorage.getItem('deliverymanloginstatus'))){
          navigate('/shophome-deliver-system/login');
      }
    },[])
    return(
        <div>
           <HeaderforDeliveryprofile/>
           <PersoanlInfo/>
           <Footer/> 
        </div>
    )
}