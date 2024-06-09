import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import Footer from "./footer";
import '../css/invoice.css'

export default function Invoice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [getOrder, setGetOrder] = useState([]);
    const [lock,setLock]=useState('block');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        axios.get(`http://localhost:3001/orderfindbyid/${id}`)
            .then((response) => {
                setGetOrder(response.data);
                console.log(response.data)
            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.value === 'cashon-delivery'){
            setLock('none');
        }
        else{
            setLock('block');
        }
    }

    const onSubmit = (data) => {

        const formData = new FormData();
        if (data.paymenttype === "cashon-delivery") {
            formData.append("billerId", getOrder.id);
            formData.append("customerid", getOrder.customerid);
            formData.append("totalPay", data.totalpay);
            formData.append("paytype", data.paymenttype);
            formData.append("bkashnumber", null);
            formData.append("trxid", null);
        } else {
            formData.append("billerId", getOrder.id);
            formData.append("customerid", getOrder.customerid);
            formData.append("totalPay", data.totalpay);
            formData.append("paytype", data.paymenttype);
            formData.append("bkashnumber", data.bkashnumber);
            formData.append("trxid", data.trxid);
        }
        // formData.append("billerId",getOrder.id);
        // formData.append("customerid",getOrder.customerid);
        // formData.append("totalPay", data.totalpay);
        // formData.append("paytype", data.paymenttype);
        // formData.append("bkashnumber", data.bkashnumber);
        // formData.append("trxid", data.trxid);

        console.log(data);
        console.log(formData);
        axios.post('http://localhost:3001/requestinvoice', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                navigate('/printinvoice/' + getOrder.id)
            }).catch(err => {
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
                        <option >Choose Payment Method</option>
                        <option value="B-kash">B-kash</option>
                        <option value="cashon-delivery">Cash-ON Delivery</option>

                    </select>
                    {errors.paymenttype && <p role="alert">{errors.position?.message}</p>}
                    <input type="text" value={getOrder.netpay || ''} {...register("totalpay", { required: "**Required**" })} placeholder={'Total bill to pay : ' + getOrder.netpay} readOnly />
                    <div style={{display:lock}}>
                        <input type="text" {...register("bkashnumber")} placeholder="Write your Bkash number" />
                        <input type="text" {...register("trxid")} placeholder="trxid" />
                    </div>
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
           <Footer/>
        </div>
    )
}