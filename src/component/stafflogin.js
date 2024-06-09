import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import Footer from "./footer";
import '../css/stafflogin.css';


export default function StaffLogin() {
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        const formData = new FormData();

        formData.append('email', data.customerEmail);
        formData.append('password',data.customerPassword);
        axios.post('http://localhost:3001/stafflogin',formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            console.log(res);
            localStorage.setItem('loginstatus',res.data.staffId);
            navigate('/001.002.003/staffprofile/'+res.data.loginid);
        }).catch(err=>console.log(err));
        console.log(data);
    };
    return (<>
        <Header />

        <div className="staff-login">
            <div className="staff-login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("position", { required: "**required**" })}>
                        <option >Choose position</option>
                        <option value="Chief Executives">Chief Executives</option>
                        <option value="Chief Financial Officer">Chief Financial Officer</option>
                        <option value="Chief Technology Officer">Chief Technology Officer</option>
                        <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                        <option value="Chief Legal Officer">Chief Legal Officer</option>
                        <option value="Operating Manager">Operating Manager</option>
                        <option value="Finanace Manager">Finance Manager</option>
                        <option value="Technology Manager">Technology Manager</option>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="Operating Officer">Operating Officer</option>
                        <option value="Finanace Officer">Finance Officer</option>
                        <option value="Technology Officer">Technology Officer</option>
                        <option value="Marketing Officer">Marketing Officer</option>
                        <option value="Sales Officer">Marketing Officer</option>
                        <option value="Junior Sales Officer">Marketing Officer</option>
                        <option value="Delivary Man">Marketing Officer</option>
                    </select>
                    {errors.position && <p role="alert" className="error">{errors.position?.message}</p>}

                    <input type="email" {...register("customerEmail", { required: true })} placeholder="E-mail address" />
                    {errors.customerEmail && <span className="error">This field is required</span>}

                    <input type="password" id="customer-password" {...register("customerPassword", { required: true })} placeholder="Password" />
                    {errors.customerPassword && <span className="error">This field is required</span>}

                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
            <Footer/>
        </div>
    </>)
}