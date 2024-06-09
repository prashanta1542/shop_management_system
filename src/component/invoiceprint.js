import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import Footer from "./footer";
import '../css/invoice.css';
import '../css/invoiceprint.css';

export default function InvoicePrint() {

  const navigate = useNavigate();
  const { orderid } = useParams();
  const [getOrder, setGetOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [getstatus, setstatus] = useState([]);
  const [getProduct,setGetproduct]= useState([]);
  const custID = getOrder.customerid;

  function getorder() {
    axios.get(`http://localhost:3001/orderfindbyid/${orderid}`)
      .then((response) => {
        setGetOrder(response.data);
      }).catch((error) => {
        console.error('Error fetching products:', error);
      });

  }
  function findstatus() {
    axios.get(`http://localhost:3001/findorderid/${orderid}`)
      .then((response) => {
        setstatus(response.data);
      }).catch((error) => {
        console.error('Error fetching products:', error);
      });

  }
  const findCust = () => {
    axios
      .get(`http://localhost:3001/customerfindbyid/${getOrder.customerid}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer:", error);
      });
  }
  function findOrderedProduct(){
    axios.get(`http://localhost:3001/findorderedProductbyId/${getOrder.customerid}`)
    .then((res)=>{
      setGetproduct(res.data)
    })
    .catch((err)=>{
      console.error("Error fetching Data",err);
    })
  }
  useEffect(() => {
    getorder();
    findstatus();
  }, []);
  useEffect(() => {
    if (getOrder.id) {
      findCust();
      findOrderedProduct();
    }
  }, [getOrder.id])
  return (
    <div>
      <Header />

      <div className="invoice-print">
        <p className="invoice-header">Invoice Form</p>
        <div className="invoice-id">
          <p>{getstatus.id}</p>
          <p>{getstatus.status}</p>
        </div>
        <div className="invoice-personal-info">
          <p>Customer Name : {customer.name}</p> <p>Customer E-mail : {customer.email}</p>
          <p>Product Name : {getProduct.productname}</p>
          <p>Product Price : {getProduct.price}</p>
          <p>Customer Contact :{customer.mobile}</p>
          <p>Customer Alternative Contact : {customer.alternative_mobile}</p>
          <p>Street Address :{customer.street}</p>
          <p>City : {customer.city}</p>
          <p>Check your mail for further state of your order</p>
        </div>

      </div>

      <Footer/>
    </div>
  )
}