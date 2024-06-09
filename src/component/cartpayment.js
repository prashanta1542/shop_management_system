import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import Footer from "./footer";
import '../css/invoice.css'

export default function CartPayment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [getOrder, setGetOrder] = useState([]);
    const [lock, setLock] = useState('block');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleChange = (e) => {
        if (e.target.value === 'cashon-delivery') {
            setLock('none');
        }
        else {
            setLock('block');
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/orderfindbyid/${id}`)
            .then((response) => {
                setGetOrder(response.data);
                console.log(response.data)
            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const onSubmit = (data) => {

        const formData = new FormData();
        if (data.paymenttype === "cashon-delivery") {
            formData.append("invoiceId", getOrder.id);
            formData.append("customerid", getOrder.customerid);
            formData.append("totalPay", data.totalpay);
            formData.append("paytype", data.paymenttype);
            formData.append("bkashnumber", null);
            formData.append("email", data.email)
            formData.append("trxid", null);
        } else {
            formData.append("invoiceId", getOrder.id);
            formData.append("customerid", getOrder.customerid);
            formData.append("totalPay", data.totalpay);
            formData.append("paytype", data.paymenttype);
            formData.append("bkashnumber", null);
            formData.append("email", data.email);
            // formData.append("trxid", data.trxid); 
        }


        console.log(data);
        console.log(formData);
        axios.post('http://localhost:3001/cartpaymentInfo', formData,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            localStorage.removeItem('cartproduct');
            console.log(res)
            window.location.href=res.data.url;
                
            }).catch(err => {
                localStorage.removeItem('cartproduct');
                    console.log(err);
                })
    };
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="invoice-form">
                <p>Invoice form {id}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("paymenttype", { required: "**required**" })} onChange={handleChange}>
                        <option >Choose Payment Type</option>
                        <option value="E-payment">E-payment</option>
                        <option value="cashon-delivery">Cash-On Delivery</option>

                    </select>
                    {errors.paymenttype && <p role="alert">{errors.position?.message}</p>}
                    <input type="text" value={getOrder.netpay || ''} {...register("totalpay", { required: "**Required**" })} placeholder={'Total bill to pay : ' + getOrder.netpay} readOnly />
                    {/* <div style={{display:lock}}>
                        <input type="text" {...register("bkashnumber")} placeholder="Write your Bkash number" />
                        <input type="text" {...register("trxid")} placeholder="trxid" />
                    </div> */}
                    <input type="email" {...register("email", { required: "**Required**" })} placeholder="write your email" />
                    <input type="submit" value="Submit" className="button" /> 
                </form>
            </div>

            <Footer />
        </div>
    )
}