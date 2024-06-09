import React, { useState, useEffect, useCallback } from "react";
import jsPDF from 'jspdf';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../css/cartprintinvoice.css';
import Header from './header';
import Footer from "./footer";

export default function CartInvoicePrint() { 
    const { id } = useParams();
    const [getinvoice, setgetinvoice] = useState([]);
    const [getproduct, setgetproduct] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [bill,setBill]=useState([]);
    async function getInvoice() {
        try {
            const response = await axios.get(`http://localhost:3001/cartorderfindinvoicebyid/${id}`);
            setgetinvoice(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
 
    async function getProduct() {
        try {
            const response = await axios.get(`http://localhost:3001/cartproductfindinvoicebyid/${getinvoice.invoice_id}`);
            setgetproduct(response.data.data);
            console.log(response.data.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    async function getCustomer() {
        try {
            const response = await axios.get(`http://localhost:3001/customerfindbyid/${getinvoice.customerid}`);
            setCustomer(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    async function orderFind() {
        try {
            const response = await axios.get(`http://localhost:3001/orderfindbyid/${getinvoice.invoice_id}`);
            setBill(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    
    function downloadPage() {
        const doc = new jsPDF();
        const pageUrl = window.location.href;
        const fileName = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);
        const html = document.documentElement;
        doc.html(html, {
            callback: function () {
                doc.save(fileName + '.pdf');
            }
        });
    }

    useEffect(() => {
        getInvoice();
    }, []);

    useEffect(() => {
        if (getinvoice.invoice_id) {
            getProduct();
            getCustomer();
            orderFind();
        }
    }, [getinvoice]);


    return (
        <div>
            <Header />
            <div className="cart-invoice">
                <p className="cart-invoice-header">Billing Details</p>
                <div className="cart-invoice-user-info">
                    <p># Invoice No : {getinvoice.invoice_id}</p>
                    <p># Customer Registration No :{getinvoice.customerid}</p>
                </div>
                <div className="cart-invoice-address-info">
                    <p>Bills type : Online Shopping (status : {getinvoice.status})</p>
                    <p>Your Shop Home</p>
                    <p>24 Mohim Das Lane, Firringibazar, Kotowali , Chattogram</p>
                    <p>Contact : 0188-2652140</p>
                    <p>E-mail : shophome98@gmail.com</p>
                </div>
                <div className="cart-invoice-auth-info">
                    <p>Authorised By : </p>
                    <div className="cart-invoice-auth-by">
                        <p>Manager : Rashma Dev</p>
                        <p>Branch : Firingeebazar Branch</p>
                        <p>Contact : 0173-8053924</p>
                        <p>Email rashmadev@gmail.com</p>
                    </div>
                </div>
                <div className="cart-invoice-product">
                    <table>
                        <tbody>
                            <tr>
                                <td>Product Name</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Totat Price</td>
                            </tr>

                            {
                                getproduct.map((item) => {
                                    return (
                                        <tr key={item.bill_id}>
                                            <td>{item.productname}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                            <td>{item.totalprice}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={3}>Total Pay :</td>
                                <td>{bill.netpay}</td>
                            </tr>
                        </tbody>
                       
                    </table>

                </div>
                <div className="cart-invoice-customer-details">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name </td>
                                <td>{customer.name}</td>
                            </tr>
                            
                            <tr>
                                <td>E-mail </td>
                                <td>{customer.email}</td>
                            </tr>
                            <tr>
                                <td>Mobile </td>
                                <td>{customer.mobile}</td>
                            </tr>
                            <tr>
                                <td>Alternate Mobile No </td>
                                <td>{customer.alternative_mobile}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Address Info </td>
                            </tr>
                            
                            <tr>
                                <td>Street </td>
                                <td>{customer.street}</td>
                            </tr>
                            <tr>
                                <td>City </td>
                                <td>{customer.city}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div className="special-note">
                    <p>This is a computer generated invoice,
                        No signature is required. If you have any query,
                        Please call our Credit & Customer Management
                        Department, Number 09619265231, Ext.: 113 for details.</p>
                </div>
                <button onClick={downloadPage}>Download Page</button>

            </div>
            <Footer/>
        </div>
    )
}