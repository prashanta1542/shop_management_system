import React, { useState, useEffect } from "react";
import StaffProfileLayout from "./staffprofilelayout";
import '../../css/staffprofile/profitmargin.css';
import axios from "axios";
import BarChart from "./barchart";
import PieChart from "./pichart";
export default function ProfitMargin() {


    const [singleOrder, getSingleOrder] = useState([]);
    const [multiOrder, getMultiOreder] = useState([]);
    const [earnbysingle, setEarnBySingle] = useState([]);
    const [earnbymulti, setEarnByMulti] = useState([]);
    const [totalcosts, setTotalCosts] = useState([]);
    //const [chartData, setChartData] = useState({});

    const findSingleOrder = () => {
        axios.get('http://localhost:3001/findorder')
            .then((res) => {
                getSingleOrder(res.data);
            })
    }

    const findMultiOrder = () => {
        axios.get('http://localhost:3001/cartpaymentinfo')
            .then((res) => {
                getMultiOreder(res.data);
            })
    }

    const calculatetotalearn = () => {
        axios.get('http://localhost:3001/totalearnfromsingleproduct')
            .then((res) => {
                setEarnBySingle(res.data.earnings);
            })
        axios.get('http://localhost:3001/totalearnfrommultiproduct')
            .then((res) => {
                setEarnByMulti(res.data.earnings);
            })
    }
    const findtotalcosts = () => {
        axios.get('http://localhost:3001/findtotalcost')
            .then((res) => {
                setTotalCosts(res.data.earnings);
            })
    }

    const chartData = {
        labels: multiOrder.map((order) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(order.createdAt))),
        datasets: [{
            label: "No Of Orders",
            data: multiOrder.map((order) => order.netpay),
            backgroundColor: ["teal"],
            borderColor: ["black"],
            borderWidth: 2,
        }]
    }
    const lineData = {
        labels: multiOrder.map((order) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(order.createdAt))),
        datasets: [{
            fill:true,
            label: "No Of Orders",
            data: multiOrder.map((order) => order.netpay),
            backgroundColor: ["#e5ff91"],
            borderColor: ["#2a0338"],
            borderWidth: 2,
        }]
    }




    useEffect(() => {
        findMultiOrder();
        findSingleOrder();
        calculatetotalearn();
        findtotalcosts();

    }, [])



    return (
        <div>
            <StaffProfileLayout />
            <div className="s-first-div">
                <div className="total-order">
                    <p>Total Order</p>
                    <p>{multiOrder.length + singleOrder.length}</p>
                </div>
                <div className="single-order">
                    <p>Single Order</p>
                    <p>{singleOrder.length}</p>
                </div>
                <div className="multi-order">
                    <p>Multi Order</p>
                    <p>{multiOrder.length}</p>
                </div>
            </div>
            <div className="s-second-div">
                <div className="earning">
                    <p>Earning</p>
                    <p>{earnbysingle + earnbymulti}</p>
                </div>
                <div className="costs">
                    <p>Costs</p>
                    <p>{totalcosts}</p>
                </div>
                <div className="revenue">
                    <p>Revenue</p>
                    <p>{(earnbysingle + earnbymulti) - totalcosts}</p>
                </div>
            </div>
            <div className="s-third-div">
                <p className="s-third-div-first-p">Division Wise Order Details</p>
                <div className="division-list">
                    <p>Chattogram <span>3</span></p>
                    <p>Dhaka<span>3</span></p>
                    <p>Khulna<span>3</span> </p>
                    <p>Barisal<span>3</span></p>
                    <p>Mymensingh<span>3</span></p>
                    <p>Rajshahi<span>3</span></p>
                    <p>Rangpur<span>3</span></p>
                    <p>Sylhet<span>3</span></p>
                </div>
            </div>
            <div className="flexGraph">
                <div className="graphstyle">
                    <BarChart chartData={chartData} />
                </div>
                <div className="graphstyle">
                    <PieChart chartData={lineData} />
                </div>
            </div>
        </div>
    )
}