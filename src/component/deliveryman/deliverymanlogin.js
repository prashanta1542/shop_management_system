import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from "../header";
import '../../css/stafflogin.css';

export default function DeliveryManLogin() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('email', data.customerEmail);
        formData.append('password',data.customerPassword);
        axios.post('http://localhost:3001/deliverymanlogin',formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            console.log(res);
            localStorage.setItem('deliverymanloginstatus',res.data.staffId);
            navigate('/shophome-deliver-system/profile/'+res.data.loginid);
        }).catch(err=>console.log(err));
        console.log(data);
    }
    return (
        <div>
            <Header/>
            <div className="staff-login">
                <div className="staff-login-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" {...register("customerEmail", { required: true })} placeholder="E-mail address" />
                        {errors.customerEmail && <span>This field is required</span>}

                        <input type="password" id="customer-password" {...register("customerPassword", { required: true })} placeholder="Password" />
                        {errors.customerPassword && <span>This field is required</span>}

                        <input type="submit" value="Submit" className="button" />
                    </form>
                </div>
            </div>

        </div> 
    )
}