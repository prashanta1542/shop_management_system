import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from "./header";
import Footer from "./footer";
import '../css/cart.css';
export default function Cart() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate= useNavigate();
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cartproduct')) || []);
    const [price, setPrice] = useState(0);
    const netprice = () => {
        let totalprice = 0;
        cartData.forEach((product) => {
            totalprice += product.quantity * product.price;
        });
        return totalprice;
    };
    const handleprice = (item) => {

        let calPrice = 0;
        cartData.map((product) => {
            if (product.id === item.id) {
                calPrice += item.quantity * item.price;
            }
        })
        return calPrice;
    }

    const addProduct = (itemId) => {
        const itemIndex = cartData.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            const updatedCartData = [...cartData];
            updatedCartData[itemIndex].quantity += 1;
            setCartData(updatedCartData);
        }
    };
    const discardProduct = (itemId) => {
        const itemIndex = cartData.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            const updatedCartData = [...cartData];
            updatedCartData[itemIndex].quantity -= 1;
            if (updatedCartData[itemIndex].quantity === 0) {
                updatedCartData.splice(itemIndex, 1); // remove the item from the cart
            }
            setCartData(updatedCartData);
        }
    };

    useEffect(() => {
        const totalPrice = netprice(cartData);
        setPrice(totalPrice);
    }, [cartData]);




    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("customerName", data.customerName);
        // formData.append("customerNid", data.customerNid);
        formData.append("customerEmail", data.customerEmail);
        formData.append("customerMobileNo", data.customerMobileNo);
        formData.append("customerAlternativeMobileNo", data.customerAlternativeMobileNo);
        // formData.append("house", data.house);
        formData.append("streetAddress", data.streetAddress);
        formData.append("city", data.city);
        // formData.append("policeStation", data.policeStation);
        // formData.append("postCode", data.postCode);
        // formData.append("postOffice", data.postOffice);
        formData.append("netpay", price);
        // Update the cartData array with the current quantity and price
        const updatedCartData = cartData.map((item) => {
            const { photo, ...rest } = item; // remove the 'photo' property from each item
            const updatedItem = {
              ...rest,
              totalPrice: item.quantity * item.price // calculate the total price of each item
            };
            return updatedItem;
          });

        // Loop through the updated cartData array and append the updated information to the formData object
        updatedCartData.forEach((item) => {
            formData.append("products[]", JSON.stringify(item));
        });
        axios.post('http://localhost:3001/cartinsert',formData, {
            headers: {
                'Content-Type': 'application/json'
            }})
           .then((res)=>{
            console.log(res);
            navigate('/cartpayment/'+res.data)
           }).catch(err=>{ 
            console.log(err);
           })
        console.log(data);
        console.log(formData);
        // console.log(JSON.parse(formData.products))
    };



    return (
        <div>
            <Header />
            <div className="cartItems">
                {cartData?.map((item) => {
                    return (
                        <div key={item.id} className="cartitem-box">
                            <div className="cartitem-image">
                                <img src={`http://localhost:3001/uploads/${item.photo}`} />
                            </div>
                            <p className="cartitem-p">{item.productName}</p>
                            <div className="cartitem-quantity">
                                <span onClick={() => addProduct(item.id)}>+</span>
                                <span>{item.quantity}</span>
                                <span onClick={() => discardProduct(item.id)}>-</span>
                            </div>
                            <p className="cartitem-p"> {handleprice(item)}</p>
                        </div>
                    )
                })}
               
            </div>
            <p className="totalprice">Total Price:{price}</p>
            <div className="cartForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("customerName", { required: "**Required**" })} placeholder="Write your Name" />
                    {errors.customerName && <p role="alert" className="error">{errors.customerName?.message}</p>}
                    <input type="email" {...register("customerEmail", { required: "**Required**" })} placeholder="E-mail address" />
                    {errors.customerEmail && <p role="alert" className="error">{errors.customerEmail?.message}</p>}
                    <input type="text" {...register("customerMobileNo", { required: "**Required**" })} placeholder="mobile number" />
                    {errors.customerMobileNo && <p role="alert" className="error">{errors.customerMobileNo?.message}</p>}
                    <input type="text" {...register("customerAlternativeMobileNo", { required: "**Required**" })} placeholder="Alternate Number" />
                    {errors.customerAlternativeMobileNo && <p role="alert" className="error">{errors.customerAlternativeMobileNo?.message}</p>}
                    <input type="text" {...register("streetAddress", { required: "**Required**" })} placeholder="Street Address" />
                    {errors.streetAddress && <p role="alert" className="error">{errors.streetAddress?.message}</p>}
                    <input type="text" {...register("city", { required: "**Required**" })} placeholder="City" />
                    {errors.city && <p role="alert" className="error">{errors.city?.message}</p>}
                    {/* <input type="text" {...register("house", { required: "**Required**" })} placeholder="House" />
                    <input type="text" {...register("customerNid", { required: "**Required**" })} placeholder="Write your National Identification Number" />
                    <input type="text" {...register("postOffice", { required: "**Required**" })} placeholder="Post Office" />
                    <input type="text" {...register("postCode", { required: "**Required**" })} placeholder="Post Code" />
                    <input type="text" {...register("policeStation", { required: "**Required**" })} placeholder="Police Station" /> */}
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
            <Footer/>
        </div>
    );
}