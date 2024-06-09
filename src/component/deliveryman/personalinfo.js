import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/deliveryman/deliverymanprofile.css';

export default function PersoanlInfo(){

    const [getCustomer,setGetCustomer]=useState([]);
    const  staffid=localStorage.getItem('deliverymanloginstatus');
    function findStaff(){
        axios.get(`http://localhost:3001/finddeliverymanbyid/${staffid}`)
        .then((res)=>{
           setGetCustomer(res.data)
        })
    }
    useEffect(()=>{
        findStaff();
    },[]);
    return(
        <div className="d-personal">
            <div className="d-personal-details">
                <div>
                <img src={`http://localhost:3001/deliverymanuploades/${getCustomer.photo}`}/>
                   <p>Position : Delivery Man </p>
                   </div>
                <div className="d-personal-info">
                    <p>Name :{getCustomer.employeename} </p>
                    <p>Father name : {getCustomer.fname}</p>
                    <p>Mother name : {getCustomer.mname}</p>
                    <p>Date of Birth : {getCustomer.dob} </p>
                    <p>Nationality : {getCustomer.nationality}</p>
                </div>
            </div>
            <div className="d-address">
                <p>Address Informations</p>
                <div className="d-address-info">
                    <div>
                        <p>Parmanent Address</p>
                        <p>Street :  {getCustomer.pstree}  </p>
                        <p>House :  {getCustomer.phouse} </p>
                        <p>City : {getCustomer.pCity} </p>
                        <p>Zilla : {getCustomer.pCity} </p>
                        <p>Post Office :  {getCustomer.ppostoffice} </p>
                        <p>Post Code :  {getCustomer.ppostcode} </p>
                    </div>
                    <div>
                        <p>Present Address</p>
                        <p>Street :  {getCustomer.parstree} </p>
                        <p>House : {getCustomer.parhouse} </p>
                        <p>City : {getCustomer.parCity} </p>
                        <p>Zilla :  {getCustomer.parCity} </p>
                        <p>Post Office :  {getCustomer.parpostoffice} </p>
                        <p>Post Code :  {getCustomer.parpostcode} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}