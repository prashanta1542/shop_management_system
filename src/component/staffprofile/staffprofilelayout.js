import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/staffprofile/staffprofilelayout.css';
export default function StaffProfileLayout() {
    const id=localStorage.getItem('loginstatus')
    const navigate=useNavigate();
    return (
        <div className="staff-profile-layout">
            <ul>
                <li>
                    <Link to={`/001.002.003/staffprofile/${id}`}>Dashboard</Link>
                </li>
                <li>
                    <Link to={`/001.002.003/profitmargin/${id}`}>Wages</Link>
                </li>
                <li>
                    <Link to={`/001.002.003/checkorder/${id}`}>Check Orders</Link>
                </li>

                <li> 
                    <Link to={`/001.002.003/entrycost/${id}`}>Costs</Link>
                </li>
                <li>
                    <Link to={`/001.002.003/productlist/${id}`}>Products</Link>
                </li>
                <li>
                    <Link to={`/001.002.003/deliverylist/${id}`}>Delivery</Link>
                </li>
                <li>
                    <Link to={`/001.002.003/stafflogin`} onClick={()=>{ localStorage.removeItem('loginstatus');}}>Logout</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}