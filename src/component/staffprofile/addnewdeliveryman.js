import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../css/staff_register.css';

export default function AddNewDeliveryMan() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [submitMessage, setsubmitMessage] = useState('');
    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('position', data.position);
        formData.append('name', data.employeename);
        formData.append('fname', data.fname);
        formData.append('mname', data.mname);
        formData.append('nationality', data.nationality);
        formData.append('dob', data.dob);
        formData.append('image', selectedFile);
        formData.append('pstreet', data.pstree);
        formData.append('phouse', data.phouse);
        formData.append('pCity', data.pCity);
        formData.append('ppostoffice', data.ppostoffice);
        formData.append('ppostcode', data.ppostcode);
        formData.append('parstreet', data.parstree);
        formData.append('parhouse', data.parhouse);
        formData.append('parCity', data.parCity);
        formData.append('parpostoffice', data.parpostoffice);
        formData.append('parpostcode', data.parpostcode);
        formData.append('mobileno', data.mobilenumber);
        formData.append('alternatenumber', data.alternatenumber);
        formData.append('officenumber', data.officenumber);
        formData.append('employeeEmail', data.employeeEmail);
        formData.append('joiningdate', data.joiningdate);
        formData.append('salary', data.salary);
        formData.append('day1',data.day1);
        formData.append('day2',data.day2);
        formData.append('day3',data.day3);
        
        console.log(formData);
        axios.post('http://localhost:3001/insertnewdeliveryman', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              console.log(response);
              setsubmitMessage('Submit Successfully');
              reset();
            })
            .catch(error => {
              console.error(error);
            });
          
    }
    return (
        <div>
            <div className="staff-register">
                <p>Add New Delivery Man</p>
                <p>{submitMessage}</p>
                <div className="staff-register-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" value="Deliveryman" {...register("position", { required: "**Required**" })} readOnly />
                        <input type="text" {...register("employeename", { required: "**Required**" })} placeholder="Write Employee Name" />
                        <input type="text" {...register("fname", { required: "**Required**" })} placeholder="What's your father name ?" />
                        <input type="text" {...register("mname", { required: "**Required**" })} placeholder="What's ypur mother's name ?" />
                        <input type="text" {...register("nationality", { required: "**Required**" })} placeholder="What is your Nationality ?" />
                        <input type="date" {...register("dob", { required: "**Required**" })} placeholder="What is your Date of Birth ?" />
                        <input type="file" onChange={handleFileInputChange} ref={fileInputRef} />

                        <p>Parmanent Address</p>
                        <input type="text" {...register("pstree", { required: "**Required**" })} placeholder="STREET" />
                        <input type="text" {...register("phouse", { required: "**Required**" })} placeholder="HOUSE or HOME TOWN" />
                        <input type="text" {...register("pCity", { required: "**Required**" })} placeholder="CITY" />
                        <input type="text" {...register("ppostoffice", { required: "**Required**" })} placeholder="POST OFFICE" />
                        <input type="text" {...register("ppostcode", { required: "**Required**" })} placeholder="POST CODE" />

                        <p>Present Address</p>
                        <input type="text" {...register("parstree", { required: "**Required**" })} placeholder="STREET" />
                        <input type="text" {...register("parhouse", { required: "**Required**" })} placeholder="HOUSE or HOME TOWN" />
                        <input type="text" {...register("parCity", { required: "**Required**" })} placeholder="CITY" />
                        <input type="text" {...register("parpostoffice", { required: "**Required**" })} placeholder="POST OFFICE" />
                        <input type="text" {...register("parpostcode", { required: "**Required**" })} placeholder="POST CODE" />

                        <p>Contact </p>
                        <input type="text" {...register("mobilenumber", { required: "**Required**" })} placeholder="mobile number" />
                        <input type="text" {...register("alternatenumber", { required: "**Required**" })} placeholder="Alternate Number" />
                        <input type="text" {...register("officenumber", { required: "**Required**" })} placeholder="OFFICE NUMBER" />
                        <input type="email" {...register("employeeEmail", { required: true })} placeholder="E-mail address" />
                        {errors.employeeEmail && <span>This field is required</span>}

                        <p>Others </p>
                        <input type="date" {...register("joiningdate", { required: "**Required**" })} placeholder="Date of join" />
                        <input type="salary" {...register("salary", { required: "**Required**" })} placeholder="Renumeartion" />
                        <p>Set Schedule </p>
                        <select {...register("day1", { required: "**required**" })}>
                            <option >Choose Day-1</option>
                            <option value="Saturday ">Saturday </option>
                            <option value="Sunday">Sunday </option>
                            <option value="Monday ">Monday </option>
                            <option value="Tuesday ">Tuesday </option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                        {errors.day1 && <p role="alert">{errors.day1?.message}</p>}

                        <select {...register("day2", { required: "**required**" })}>
                            <option >Choose Day-1</option>
                            <option value="Saturday ">Saturday </option>
                            <option value="Sunday">Sunday </option>
                            <option value="Monday ">Monday </option>
                            <option value="Tuesday ">Tuesday </option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                        {errors.day2 && <p role="alert">{errors.day2?.message}</p>}

                        <select {...register("day3", { required: "**required**" })}>
                            <option >Choose Day-1</option>
                            <option value="Saturday ">Saturday </option>
                            <option value="Sunday">Sunday </option>
                            <option value="Monday ">Monday </option>
                            <option value="Tuesday ">Tuesday </option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                        {errors.day3 && <p role="alert">{errors.day3?.message}</p>}



                        <input type="submit" value="Submit" className="button" />
                    </form>
                </div>
            </div>
        </div>
    )

}