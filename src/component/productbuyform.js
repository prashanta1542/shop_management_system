import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import Footer from "./footer";
import '../css/productbuyform.css';
import myImages from "../Untitled design.png";
export default function ProductBuyForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [getProduct, setGetProduct] = useState([]);
    const [TotalPrice, getTotalprice] = useState();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:3001/product/${id}`)
            .then((response) => {
                setGetProduct(response.data);
                getTotalprice(response.data.price);
                console.log(response.data)
            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);





    function handleQuantityChange() {

        setQuantity(quantity + 1);
        getTotalprice(quantity * getProduct.price)
    }

    const onSubmit = (data) => {

        const formData = new FormData();
  formData.append("customerName", data.customerName);
//   formData.append("customerNid", data.customerNid);
  formData.append("customerEmail", data.customerEmail);
  formData.append("customerMobileNo", data.customerMobileNo);
  formData.append("customerAlternativeMobileNo", data.customerAlternativeMobileNo);
//   formData.append("house", data.house);
  formData.append("streetAddress", data.streetAddress);
  formData.append("city", data.city);
//   formData.append("policeStation", data.policeStation);
//   formData.append("postCode", data.postCode);
//   formData.append("postOffice", data.postOffice);
  formData.append("productid", getProduct.id);
  formData.append("productname", getProduct.productName);
  formData.append("price", getProduct.price);
  formData.append("quantity", quantity);
  formData.append("totalprice", TotalPrice);
  formData.append("netpay", TotalPrice);
  console.log(data);
  console.log(formData);
  axios.post('http://localhost:3001/orderplace', formData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      
      navigate('/invoice/'+response.data)
    })
    


    };

    return (
        <div className="product-buy-form">
             <Header  />
            <div className="product-buy-form-description">
                <h1>Congumer form request</h1>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("customerName", { required: "**Required**" })} placeholder="Write your Name" />
                        <input type="email" {...register("customerEmail", { required: true })} placeholder="E-mail address" />
                        <input type="text" {...register("customerMobileNo", { required: "**Required**" })} placeholder="mobile number" />
                        <input type="text" {...register("customerAlternativeMobileNo", { required: "**Required**" })} placeholder="Alternate Number" />
                        <input type="text" {...register("streetAddress", { required: "**Required**" })} placeholder="Street Address" />
                        <input type="text" {...register("city", { required: "**Required**" })} placeholder="City" />
                        {/* <input type="text" {...register("house", { required: "**Required**" })} placeholder="House" />
                         <input type="text" {...register("customerNid", { required: "**Required**" })} placeholder="Write your National Identification Number" />
                        <input type="text" {...register("postOffice", { required: "**Required**" })} placeholder="Post Office" />
                        <input type="text" {...register("postCode", { required: "**Required**" })} placeholder="Post Code" />
                        <input type="text" {...register("policeStation", { required: "**Required**" })} placeholder="Police Station" /> */}
                        <input type="submit" value="Submit" className="button" />
                    </form>


                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <th>Product Name</th>
                                <th>Price per Unit</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                            <tr>
                                <td>{getProduct.productName}</td>
                                <td>{getProduct.price}</td>
                                <td onClick={handleQuantityChange}>{quantity}</td>
                                <td>{TotalPrice}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>Net Pay</td>
                                <td>{TotalPrice}</td>
                            </tr>
                            </tbody>  
                        </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

