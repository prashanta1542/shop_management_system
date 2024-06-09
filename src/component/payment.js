import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../component/header";
import Footer from "./footer";
import '../css/payment.css';

export default function Payment() {
    const totalAmount = 1230;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const onSubmit = data => {
        const formData = new FormData();

        console.log(data);

    };
    return (
        <div>
            <Header />
            <div className="payment-option">
                <div className="payment-form">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <label>Total amount to be paid</label>
                        <input type="text" value={totalAmount} {...register("totalamount")} readOnly />


                        <label htmlFor="customerAlternativeMobileNo">Enter Payee Bkash Mobile No:</label>
                        <input type="text" {...register("paymentnumber", { pattern: /^[0-9]*$/ })} />

                        {errors.customerAlternativeMobileNo && errors.customerAlternativeMobileNo.type === "pattern" && <span>Invalid mobile number format</span>}

                        <label>Enter trx Id</label>
                        <input type="text" {...register("trxid", { required: true })} />
                        {errors.trxid && <span>it is required</span>}

                        <input type="submit" name="submit" />
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}