import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import StaffProfileLayout from "./staffprofilelayout";
import '../../css/staffprofile/costsentry.css';
export default function CostsEntry() {
    const [costtype, setcosttype] = useState([]);
    const [response, setresponse] = useState('');
    const { register: register, handleSubmit: handleSubmit, watch: watch, formState: { errors: errors }, reset: reset } = useForm();
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, formState: { errors: errors1 }, reset: reset1 } = useForm();
    const navigate = useNavigate();
    const [costList, setcostList] = useState([]);
    const [searchKey, setSearchkey] = useState('');
    const [currentpage, setCurrentpage] = useState(1);
    const orderNo = 3;
    const pages = [];

    function fetchCosts() {
        axios.get('http://localhost:3001/findcost')
            .then((res) => {
                setcostList(res.data);
            }).catch((err) => {
                console.error(err)
            })
        axios.get('http://localhost:3001/fetchallcosttype')
            .then((res) => {
                setcosttype(res.data);
            })
    }

    const onSubmit = data => {
        const formData = new FormData();

        formData.append('Type', data.type);
        formData.append('Details', data.details);
        formData.append('Amount', data.amount);

        axios.post('http://localhost:3001/costenter', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                reset();
                console.log(res.data)
            }).catch((err) => {
                console.error(err);
            })
        console.log(formData);
    }
    const costSubmit = (e) => {

        const formdata1 = new FormData();
        formdata1.append('cost', e.cost);
        console.log(formdata1)
        axios.post('http://localhost:3001/addnewcosttype', formdata1, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            reset1();
        }).catch((err) => {
            setresponse(err);
            reset1();
        })
    }

    const lastorderindex = currentpage * orderNo;
    const firstorderindex = lastorderindex - orderNo;
    const showList = costList.slice(firstorderindex, lastorderindex);
    for (let i = 1; i <= Math.ceil(orderNo / currentpage); i++) {
        pages.push(i);
    }
    function previousPage() {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    }

    function nextPage() {
        if (currentpage < Math.ceil(costList.length / orderNo)) {
            setCurrentpage(currentpage + 1);
        }
        else {
            setCurrentpage(1);
        }
    }
    const handleSearch = (e) => {

        setSearchkey(e.target.value)

    }
    const hideAlert = () => {
        setTimeout(()=>{
            setresponse('')
        },1000)
      };
    
    useEffect(() => {
        fetchCosts();
        
    }, []);
    return (
        <div>
            <StaffProfileLayout />
            <div className="costtype">
                <div className="costtype-form">
                    {(response === 'Successfully Insert' || response === '') ? null : <p className="alert" onLoad={()=>{hideAlert()}}>Already Exists in Type</p>}

                    <form onSubmit={handleSubmit1(costSubmit)} >
                        <input type="text" {...register1("cost", { required: true })} placeholder="Entry new cost type" />
                        <input type="submit" value="Enter" />
                    </form>
                </div>
                <div className="costtype-search">
                    <input type="text" onChange={(e) => handleSearch(e)} placeholder="search here..." />
                </div>
            </div>
            <div className="cost-details">
                <div className="costs-form">
                    <p className="costs-form-p">Entry Daily Costs </p>
                    <div className="costs-form-final">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <select type="text" {...register("type", { required: true })} placeholder="What type of Costs?" >
                                <option>Select cost type</option>
                                {
                                    costtype.map((e, index) => {
                                        return <option value={e.costs} key={index}>{e.costs}</option>
                                    })
                                }
                            </select>
                            {errors.type && <span>This field is required</span>}

                            <textarea type="text" {...register("details", { required: true })} placeholder="Write a short notes about the cost" />
                            {errors.details && <span>This field is required</span>}
                            <input type="number" {...register("amount", { required: true })} placeholder="Amount" />
                            {errors.amount && <span>This field is required</span>}

                            <input type="submit" value="Submit" className="button" />
                        </form>
                    </div>
                </div>
                {/* cost table for pasignation */}
                <div className="costs-table" style={(searchKey === "") ? { display: "block" } : { display: "none" }}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Daily Costs Report</th>
                            </tr>
                            <tr>
                                <th>Cost ID</th>
                                <th>Cost Type</th>
                                <th>Cost Details</th>
                                <th>Amount</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showList.map((item) => {
                                    return (
                                        <tr key={item.costid}>
                                            <td>{item.costid}</td>
                                            <td>{item.type}</td>
                                            <td>{item.details}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.createdAt}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="handlecarousel" colSpan={5}>
                                    <BsChevronDoubleLeft onClick={() => previousPage()} />
                                    <BsChevronDoubleRight onClick={() => nextPage()} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {/* cost table for search */}
                <div className="costs-table" style={(searchKey !== "") ? { display: "block" } : { display: "none" }}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Daily Costs Report</th>
                            </tr>
                            <tr>
                                <th>Cost ID</th>
                                <th>Cost Type</th>
                                <th>Cost Details</th>
                                <th>Amount</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                costList.filter((item) => {
                                    if (item.type.toLowerCase().includes(searchKey.toLowerCase())) {
                                        return true
                                    }
                                })
                                    .map((item) => {
                                        return (
                                            <tr key={item.costid}>
                                                <td>{item.costid}</td>
                                                <td>{item.type}</td>
                                                <td>{item.details}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.createdAt}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="handlecarousel" colSpan={5}>
                                    <BsChevronDoubleLeft onClick={() => previousPage()} />
                                    <BsChevronDoubleRight onClick={() => nextPage()} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {/* cost table for search */}
            </div>
        </div>
    )
}