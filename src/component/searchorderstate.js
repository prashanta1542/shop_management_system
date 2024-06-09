import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import Footer from "./footer";
import '../css/searchorder.css';

export default function SearchOrder() {

  const navigate = useNavigate();
  const [orderid, setOredrid] = useState('');
  const [message,setMassage]=useState('')

  function getorder(event) {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page
    axios
    .get(`http://localhost:3001/orderfindbyid/${orderid}`)
    .then((response) => {
      navigate('/printinvoice/'+orderid)
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        axios
        .get(`http://localhost:3001/cartorderfindinvoicebyid/${orderid}`)
        .then((response)=>{
          navigate('/cartinvoice/' + orderid);
        }).catch((error)=>{
          if (error.response && error.response.status === 404) {
            setMassage("Order not found")
          }
        })
      } 
    });
      
  }



  return (
    <div>
      <Header />
      
      <div className="order-state-form">
        { (message)?<p className="message">{message}</p>:null
          }
        <form onSubmit={getorder}>
          <input
            type="text"
            placeholder="Enter your order id.."
            onChange={(event) => setOredrid(event.target.value)}
          />
          <input type="submit" value="Submit" className="button" />
        </form>
      </div>
      <Footer/>
    </div>

  )
}