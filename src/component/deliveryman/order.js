import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/deliveryman/deliverymanprofile.css';
import '../../css/deliveryman/orders.css'
import HeaderforDeliveryprofile from "./header";
import Footer from "../footer";

export default function Order() {

    const [getOrder, setGetOrder] = useState([]);
    const [getReport, setGetReport] = useState([]);
    const item = [];
    const navigate = useNavigate();
    const id = localStorage.getItem('deliverymanloginstatus');
    function details(type, id) {
        if (type === 'multi') {
            getOrder.map((item) => {
                if (item.id === id) {
                    navigate('/cartinvoice/' + item.order_id);
                }
            })
        }
        else if (type === "single") {
            getOrder.map((item) => {
                if (item.id === id) {
                    navigate('/printinvoice/' + item.order_id)
                }
            })
        }
        else {
            console.log("Not Exist")
        }
    }


    function findjobs() {
        axios.get(`http://localhost:3001/findjobbyid/${id}`)
            .then((res) => {
                setGetOrder(res.data);
            })
        axios.get('http://localhost:3001/findreports')
            .then((res) => {
                setGetReport(res.data);
            })
    }
    function fiter() {
        getOrder.map((e) => {
            getReport.map((item) => { if (item.orderid === e.id) { console.log("true") } })
        })
    }
    useEffect(() => {
        if (!(localStorage.getItem('deliverymanloginstatus'))) {
            navigate('/shophome-deliver-system/login');
        }
    }, [])
    useEffect(() => {
        findjobs();
        setTimeout(() => {
            fiter();
        }, 5000)
    }, [])
    return (
        <div>
            <HeaderforDeliveryprofile />
            <div className="check-orders">
                <p>New orders arrives...</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Invoice Id</th>
                            <th>Scheduled</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>

                        {
                            getOrder
                                .filter((item) => {
                                    if (getReport.some((e) => e.id === item.order_id)){
                                        return false
                                    }else{
                                        return true
                                    }
                                })
                                .map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.order_id}</td>
                                        <td>{item.date}_{item.day}</td>
                                        <td onClick={() => { details(item.type, item.id) }}>Click Here For More details..</td>
                                        <td onClick={() => { navigate(`/shophome-deliver-system/searchorder/${item.order_id}`) }}>
                                            <p className="submit-button">SUBMIT</p>
                                        </td>
                                    </tr>
                                ))
                        }


                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}