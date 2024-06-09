import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/staffprofile/checkorder.css';
import '../../css/staffprofile/productslist.css'
import StaffProfileLayout from "./staffprofilelayout";
import CheckDeliveredButton from "./checkDeliveredbutton";
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { BsChevronDoubleRight } from 'react-icons/bs';


export default function CheckOrder() {

    const [getInfo, setGetInfo] = useState([]);
    const [getCartInfo, setGetCartInfo] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    const [orderNo, setorderNo] = useState(5);
    const [multiCurrentPage, setMultiCurrentPage] = useState(1);
    const [multiorder, setMultiorder] = useState(5);
    const multipages = [];
    const pages = [];
    const [searchkey,getSearchKey]=useState('');
    const navigate = useNavigate();
    function getPaymentInfo() {
        axios.get('http://localhost:3001/findorder')
            .then((res) => {
                setGetInfo(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function getCartPaymentInfo() {
        axios.get('http://localhost:3001/cartpaymentinfo')
            .then((res) => {
                setGetCartInfo(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }
    function updateStatus(id) {
        axios.get(`http://localhost:3001/changestatus/${id}`)
            .then(() => {
                getPaymentInfo();
                window.location.reload();
            })
    }
    function updateCartStatus(id) {
        axios.get(`http://localhost:3001/changecartpaymentstatus/${id}`)
            .then(() => {
                getCartPaymentInfo();
            })
    }
    function deteteorder(id1,id2){
        axios.get(`http://localhost:3001/deleteorder/${id1}/${id2}`)
            .then(() => {
                window.location.reload();
            })
    }
    function detetecartorder(id1,id2){
        axios.get(`http://localhost:3001/deletecartorder/${id1}/${id2}`)
            .then(() => {
                window.location.reload();
            })
    }
    const lastorderindex = currentpage * orderNo;
    const firstorderindex = lastorderindex - orderNo;
    const showOrder = getInfo.slice(firstorderindex, lastorderindex);
    for (let i = 1; i <= Math.ceil(orderNo / currentpage); i++) {
        pages.push(i);
    }
    function previousPage() {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    }

    function nextPage() {
        if (currentpage < Math.ceil(getInfo.length / orderNo)) {
            setCurrentpage(currentpage + 1);
        }
        else {
            setCurrentpage(1);
        }
    }

    const multilastorderindex = multiCurrentPage * multiorder;
    const multifirstorderindex = multilastorderindex - multiorder;
    const multiShowOrder = getCartInfo.slice(multifirstorderindex, multilastorderindex);
    for (let i = 1; i <= Math.ceil(multiorder / multiCurrentPage); i++) {
        multipages.push(i);
    }
    function multipreviousPage() {
        if (multiCurrentPage > 1) {
            setMultiCurrentPage(multiCurrentPage - 1);
        }
    }

    function multinextPage() {
        if (multiCurrentPage < Math.ceil(getCartInfo.length / multiorder)) {
            setMultiCurrentPage(multiCurrentPage + 1);
        }
        else {
            setMultiCurrentPage(1);
        }
    }
    useEffect(() => {
        getPaymentInfo();
        getCartPaymentInfo();
    }, [])
    return (
        <div>
            <StaffProfileLayout />
            <div className="search-pro-cat">

                <input type="text" onChange={(e) => { getSearchKey(e.target.value) }} placeholder="Search by orderid...." />
            
            </div>
            
            <div>
                <table>
                    <thead>
                        <tr className="checkorder-table-heding">
                            <th colSpan={8}>For Single Product</th>
                        </tr>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Total Pay</th>
                            <th>Payment Type</th>
                            {/* <th>Transaction No.</th>
                            <th>Trx ID</th> */}
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showOrder.filter((infos) => {
                                if (infos.id.toLowerCase().includes(searchkey.toLowerCase())) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
    
                            })
                            .map((infos) => {
                                return (
                                    <tr key={infos.id}>
                                        <td> #{infos.id}</td>
                                        <td> #{infos.customerid}</td>
                                        <td> {infos.netpay}</td>
                                        <td> {infos.paymeenttype}</td>
                                        {/* <td> {infos.bakshnumber}</td>
                                        <td> {infos.trxid}</td> */}
                                        <td>
                                            <p onClick={() => { updateStatus(infos.id) }} className="tableupdatebtn">{infos.status}</p>
                                        { ((infos.status)==='pending')  ? <p onClick={()=>{deteteorder(infos.customerid ,infos.id )}} className="tableupdatebtn">Delete Order</p>:null }
                                        </td>
                                        <td>
                                            <CheckDeliveredButton id={infos.id} />
                                            
                                        </td>
                                    </tr>
                                )

                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="handlecarousel" colSpan={8}>
                                <BsChevronDoubleLeft onClick={() => previousPage()} />
                                <BsChevronDoubleRight onClick={() => nextPage()} />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div>
                <table>
                    <thead>
                        <tr className="checkorder-table-heding">
                            <th colSpan={9}>For Multi Product</th>
                        </tr>
                        <tr>
                            <th>Order ID</th>
                            {/* <th>Bill Id</th> */}
                            <th>Customer ID</th>
                            <th>Total Pay</th>
                            <th>Payment Type</th>
                            {/* <th>Transaction No.</th>
                            <th>Trx ID</th> */}
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            multiShowOrder.filter((infos) => {
                                if (infos.bill_id.toLowerCase().includes(searchkey.toLowerCase())) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
    
                            })
                            .map((infos) => {
                                return (
                                    <tr key={infos.invoice_id}>
                                        <td> #{infos.bill_id}</td>
                                        {/* <td> #{infos.invoice_id}</td> */}
                                        <td> #{infos.customerid}</td>
                                        <td> {infos.netpay}</td>
                                        <td> {infos.paymeenttype}</td>
                                        {/* <td> {infos.bakshnumber}</td>
                                        <td> {infos.trxid}</td> */}
                                        <td>
                                            <p onClick={() => { updateCartStatus(infos.invoice_id) }}
                                                className="tableupdatebtn">{infos.status}</p>
                                            {((infos.status) === "pending")?<p onClick={()=>detetecartorder(infos.customerid,infos.bill_id)} className="tableupdatebtn">Delete Order</p>:null}
                                        </td>
                                        <td>
                                            <CheckDeliveredButton id={infos.bill_id} />
                                        </td>
                                    </tr>
                                )

                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="handlecarousel" colSpan={9}>
                                <BsChevronDoubleLeft onClick={() => multipreviousPage()} />
                                <BsChevronDoubleRight onClick={() => multinextPage()} />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}