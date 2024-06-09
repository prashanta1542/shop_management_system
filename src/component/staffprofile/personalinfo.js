import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/staffprofile/personalinfo.css';

export default function PersoanlInfo() {
    const {id}= useParams();
    const navigate = useNavigate();
    const [getCustomer,setGetCustomer]=useState([]);
    const  staffid=localStorage.getItem('loginstatus');
    function findStaff(){
        axios.get(`http://localhost:3001/findstaffbyid/${staffid}`)
        .then((res)=>{
           setGetCustomer(res.data)
        })
    }
    useEffect(()=>{
        if(!staffid){
            navigate('/001.002.003/stafflogin')
        }
        findStaff();
    },[])
    return (
        <div className="staff-personal">
            <p> Staff Personal Information</p>

            <p>Personal Information</p>
            <div className="staff-personal-info">
                <div>
                <img src={`http://localhost:3001/staffuploades/${getCustomer.photo}`} alt={getCustomer.employeename} />
                    <p>Position : {getCustomer.position} </p>

                </div>

                <div>
                    <p>Name :  {getCustomer.employeename} </p>
                    <p>Father Name :  {getCustomer.fname} </p>
                    <p>Mother Name :  {getCustomer.mname} </p>
                    <p>Date of Birth : {getCustomer.dob} </p>
                    <p>Nationality : {getCustomer.nationality} </p>
                  
                </div>
            </div>
            <div className="staff-address">
                <p>Address Informations</p>
                <div className="staff-address-info">
                    <div>
                        <p> Parmanent Address </p>
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
            <div className="staff-contact-info">
                <p>Contact Informations</p>
                <div>
                    <p> {getCustomer.customerEmail} </p>
                    <p> {getCustomer.officenumber} </p>
                    <p> {getCustomer.alternatenumber} </p>
                </div>
            </div>
        </div>
    );
}