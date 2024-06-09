import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import StaffProfileLayout from "./staffprofilelayout";
import '../../css/stafflogin.css';

export default function HireDeliveryMan() {
    const sid = localStorage.getItem('loginstatus');
    const [hirebox, setHirebox] = useState('block');
    const [servicebox, setServicebox] = useState('none');
    const [limitalert, setlimitalert] = useState('');
    const [timealert, settimealert] = useState('');
    const [schedulealert, setschedulealert] = useState('');
    const [sechedule, setSechedule] = useState('');
    const [delivery, setdelivery] = useState([]);
    const [deliveryman, setDeliveryman] = useState([]);
    const [findschedule, setFindSchedule] = useState([]);
    const [jobId, setjobId] = useState('');
    const validDay = [];
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, formState: { errors: errors1 }, reset: reset1 } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, formState: { errors: errors2 }, reset: reset2 } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const onSubmit = data => {
        const fsched = new Date(sechedule);
        const optionsday = { weekday: 'long' };
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formData = new FormData();

        formData.append('jobid', jobId);
        formData.append('Orderid', data.orderid);
        formData.append('Deliveryid', data.deliveryid)
        formData.append('day', fsched.toLocaleDateString('en-US',optionsday));
        formData.append('date',fsched.toLocaleDateString('en-us',optionsDate));
        formData.append('time', fsched.toLocaleTimeString('en-US',optionsTime));
        formData.append('Type', data.type);

        axios.post('http://localhost:3001/hiredeliveryman', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                reset1();
                navigate(`/001.002.003/checkorder/${sid}`);
            }).catch((err) => {
                console.error(err);
            })
        console.log(formData);
    }
    const onSubmit2 = data => {
        const formData = new FormData();

        formData.append('Orderid', data.orderid);
        formData.append('Schedule', data.scheduled);
        formData.append('Date', data.date);
        formData.append('Day', data.day);
        formData.append('Type', data.type);
        formData.append('Services', data.services);
        axios.post('http://localhost:3001/hiredeliveryman', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                reset2();
                //navigate(`/001.002.003/checkorder/${sid}`);
                console.log(formData);
            }).catch((err) => {
                console.error(err);
            })
        console.log(formData);
    }
    const setJobId = (id) => {
        axios.get(`http://localhost:3001/findjobbyid/${id}`)
            .then((res) => {
                setDeliveryman(res.data);
                // console.log(res.data)
                setjobId(id)
            })
        axios.get(`http://localhost:3001/findschedulebyid/${id}`)
            .then((res) => {
                setFindSchedule(res.data);
            })
    }

    function findDeliveryMan() {
        axios.get('http://localhost:3001/finddeliveryman')
            .then((res) => {
                setdelivery(res.data);
            })
    }
    function handleTimeSchedule(data) {
        //console.log(data);
        setSechedule(data);
        const dateTime = new Date(data);
        const optionsday = { weekday: 'long' };
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

        validDay.push(findschedule.day1.trim());
        validDay.push(findschedule.day2.trim());
        validDay.push(findschedule.day3.trim());

        if (!(validDay.includes(dateTime.toLocaleDateString('en-US', optionsday)))) {
            setschedulealert("The input date does not match a Schedule of User.Please choose from above days : " + findschedule.day1 + " , " + findschedule.day2 + ' , ' + findschedule.day3);
        }else{
            setschedulealert('')
        }
        deliveryman.forEach((d, index) => {
            if ((d.date === dateTime.toLocaleDateString('en-US', optionsDate)) && (d.time === dateTime.toLocaleTimeString('en-US', optionsTime))) {
                settimealert('This time already in scheduled. Change it before or after 30 minutes!!');
            }
            else{
                settimealert('');
            }
        })
        let findLength = 0;
        deliveryman.forEach((d, index) => {
            if ((d.date === dateTime.toLocaleDateString('en-US', optionsDate))) {
                findLength++;
            }
        })
        if (findLength >= 5) {
            setlimitalert('User already reached at highest priority of orders today not possible to take new order');
        }else{
            setlimitalert('')
        }


    }
    useEffect(() => {
        findDeliveryMan();

    }, [])
    return (
        <div>
            <StaffProfileLayout />
            <div className="select-delivery-option">
                <div className="select-delivery-type">
                    <select onClick={(e) => {
                        if (e.target.value === "hire") {
                            // setHirebox('block');
                            setServicebox('none');
                        }
                        else if (e.target.value === "service") {
                            setServicebox('block');
                            setHirebox('none');
                        }
                        else {
                            setHirebox('block');
                            setServicebox('none');
                        }
                    }}>
                        <option value="choose">Choose Options</option>
                        <option value="service">Select Service</option>
                        <option value="hire">Hire a Delivery Man</option>
                    </select>

                </div>
                <div className="staff-login-form" style={{ display: servicebox }}>
                    <p className="select-service">Select Services</p>
                    <form onSubmit={handleSubmit2(onSubmit2)}>
                        <input type="text" value={id} {...register2("orderid")} readOnly />

                        <input type="datetime-local" {...register2("scheduled", { required: true })} />
                        {errors2.scheduled && <span>This field is required</span>}


                        <input type="date" {...register2("date", { required: true })} placeholder="Schedule up to.." />
                        {errors2.date && <span>This field is required</span>}

                        <select {...register2("day", { required: "**required**" })}>
                            <option >Choose Day</option>
                            <option value="Saturday ">Saturday </option>
                            <option value="Sunday">Sunday </option>
                            <option value="Monday ">Monday </option>
                            <option value="Tuesday ">Tuesday </option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                        {errors2.day && <p role="alert">{errors2.position?.message}</p>}

                        <select {...register2("type", { required: "**required**" })}>
                            <option >Choose Type</option>
                            <option value="single">Single </option>
                            <option value="multi">Multi </option>
                        </select>
                        {errors2.type && <p role="alert">{errors2.position?.message}</p>}

                        <select {...register2("services", { required: "**required**" })}>
                            <option >Choose Service</option>
                            <option value="sundarban-courier">Sundarban Courier Services </option>
                            <option value="sa-paribahan">SA Poribohon </option>
                        </select>
                        {errors2.type && <p role="alert">{errors2.services?.message}</p>}

                        <input type="submit" value="Submit" className="button" />
                    </form>
                </div>
                <div className="staff-login-form" style={{ display: hirebox }}>
                    <form onSubmit={handleSubmit1(onSubmit)}>
                       
                        { schedulealert && <p className="alertbtn">{schedulealert}</p>}
                        { timealert && <p className="alertbtn">{timealert}</p>}
                        { limitalert && <p className="alertbtn">{limitalert}</p>}
                        <input type="text" value={id} {...register1("orderid")} readOnly />

                        <select {...register1('deliveryid', { required: "**required**" })}>
                            <option>Choose Delivery Man</option>
                            {
                                delivery.map((mens) => {
                                    return (
                                        <option key={mens.id} onClick={() => { setJobId(mens.id) }}>{mens.employeename}</option>
                                    )
                                })
                            }
                        </select>

                        <input type="datetime-local" {...register1("scheduled", { required: true })} onChange={(e) => { const dt = e.target.value; handleTimeSchedule(dt) }} />
                        {errors1.scheduled && <span>This field is required</span>}

                        <select {...register1("type", { required: "**required**" })}>
                            <option >Choose Type</option>
                            <option value="single">Single </option>
                            <option value="multi">Multi </option>
                        </select>
                        {errors1.type && <p role="alert">{errors1.position?.message}</p>}

                        <input type="submit" value="Submit" className="button" />
                    </form>
                </div>
            </div>
        </div>

    )
}