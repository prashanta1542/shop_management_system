import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/deliveryman/deliverymanprofile.css';
import '../../css/deliveryman/submitform.css';
import HeaderforDeliveryprofile from "./header";
import Footer from "../footer";

export default function SubmitForm() {
    const { id } = useParams();
    const [otp, setotp] = useState([]);
    const [orderid, setOrderid] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [order, setOrder] = useState([]);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    function HandleSubmit(e) {
        e.preventDefault();
        if (otp.orderid === orderid) {
            setStatus("true")
        } else {
            setStatus("false")
        }
    }
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('orderid', otp.orderid);
        formData.append('otp', otp.otp);
        formData.append("reporttype", data.reporttype);
        formData.append("description", data.description);
        console.log(formData);
        axios.post('http://localhost:3001/reportinsert', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            reset();
            setStatus('');
        })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    reset();
                    setError("Already submit the data")
                } else {
                    console.error(error);
                }
            })
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/orderconfirmation/${id}`)
            .then((res) => {
                console.log(res.data)
                setotp(res.data);
            })

        axios.get(`http://localhost:3001/findorderid/${id}`)
            .then((res) => {
                setOrder(res.data);
            }).catch((err) => {
                if (err) {

                    axios.get(`http://localhost:3001/findcartpaymentinfobyid/${id}`)
                        .then((res) => {
                            setOrder(res.data);
                        })
                }
            })

    }, [])

    return (
        <>
            <HeaderforDeliveryprofile />
            <div className="formDelivered">

                <form onSubmit={HandleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your order id.."
                        onChange={(event) => setOrderid(event.target.value)}
                    />
                    <input type="submit" value="Submit" className="button" />
                </form>
                {(error === '') ? null : <p className="alert">{error}</p>}
                {(status === "true") ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <input  placeholder={'Order Id :'+otp.orderid} readOnly />
                        <input  placeholder={'OTP : ' + otp.otp} readOnly />
                        {
                            order.map((order,index) => {
                                return (
                                    <div key={index}>
                                        <input type="text" value={order.paymeenttype || ''} placeholder={'Payment Type : ' + order.paymeenttype} readOnly />
                                        <input type="text" value={order.netpay || ''} placeholder={'Total Pay : ' + order.netpay} readOnly />
                                    </div>
                                )
                            })
                        }
                        <select {...register("reporttype", { required: "**required**" })} >
                            <option>Select Action</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Customer Do not Pick">Not Pick up</option>
                        </select>
                        <textarea type="text" {...register("description")} placeholder="Description..." />
                        <input type="submit" value="Submit" className="button" />
                    </form>
                ) : (status === 'false') ? (
                    <p className="alert">Not Match otp</p>
                ) : ''}
            </div>
            <Footer />
        </>
    )
}