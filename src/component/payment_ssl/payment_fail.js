import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../header';
import Footer from "../footer";
import '../../../src/css/invoice.css';
import './payment.css';
export default function FailPayment() {
    
    return (
        <>

            <div>
                <Header />
            </div>
            <div className="payment-fail">
                <p>Your Payment is fail ! try again</p>
            </div>
            <Footer />
        </>
    )
}