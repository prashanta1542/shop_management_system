import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/deliveryman/deliverymanheader.css';

export  default function HeaderforDeliveryprofile() {
    const id = localStorage.getItem('deliverymanloginstatus');
    return (
        <div className="d-header">
            <div className="d-header-title">
                <p>Your Shop Home</p>
            </div>
            <div className="d-header-form">
                <form>
                    <input type="text" placeholder="Search your customer , invoice , Deliver Product" />
                    <input type="submit" />
                </form>
            </div>
            <div className="d-header-nav">
                <p>
                    <Link to={`/shophome-deliver-system/profile/${id}`}>Dashboard</Link>
                </p>
                <p>
                    <Link to={`/shophome-deliver-system/orders/${id}`}>Orders</Link>
                </p>
                <p>
                    <Link to={`/shophome-deliver-system/login`} onClick={()=>{localStorage.removeItem('deliverymanloginstatus')}}>Logout</Link>
                </p>
                
            </div>
        </div>
    )
}