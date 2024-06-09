import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/staffprofile/checkorder.css';

export default function CheckDeliveredButton(id){
    const navigate = useNavigate();
    const [deliveredStatus, setDeliveredStatus] = useState('');
    const Id=id.id;
    function findDelivered() {
        axios.get(`http://localhost:3001/findondeliverybyid/${Id}`)
          .then((res) => {
                setDeliveredStatus(res.data)
                console.log(res.data)
         
            
          })
          .catch((err) => {
            console.error(err);
          });
      }
    useEffect(() => {
        findDelivered();
    }, [Id])
    function HireDeliveryMan(id) {
        navigate(`/001.002.003/hiredelivary/${id}`);
       
    }
    return(
        <>
         {
            (deliveredStatus === "No records found") ? <p onClick={() => { HireDeliveryMan(id.id) }} className="tabledeletebtn">Hire Delivery Man</p> :  <p className="tabledeletebtn">{deliveredStatus}</p> 
         }
         {/*  */}
        </>
        
        
    )
}