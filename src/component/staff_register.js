import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from './header';
import '../css/staff_register.css';

export default function StaffRegister() {
    const { register, handleSubmit, watch, formState: { errors },reset  } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [submitMessage,setsubmitMessage]=useState('');
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
        
        console.log(formData);
        console.log(data.pcity)
        axios.post('http://localhost:3001/staffinsert', formData, {
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
    

};


return (
    <div>
        <Header />
        <div className="staff-register">
          <p>{submitMessage}</p>
            <div className="staff-register-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("position", { required: "**required**" })}>
                        <option >Choose position</option>
                        <option value="Chief Executives">Chief Executives</option>
                        <option value="Chief Financial Officer">Chief Financial Officer</option>
                        <option value="Chief Technology Officer">Chief Technology Officer</option>
                        <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                        <option value="Chief Legal Officer">Chief Legal Officer</option>
                        <option value="Operating Manager">Operating Manager</option>
                        <option value="Finanace Manager">Finance Manager</option>
                        <option value="Technology Manager">Technology Manager</option>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="Operating Officer">Operating Officer</option>
                        <option value="Finanace Officer">Finance Officer</option>
                        <option value="Technology Officer">Technology Officer</option>
                        <option value="Marketing Officer">Marketing Officer</option>
                        <option value="Sales Officer">Marketing Officer</option>
                        <option value="Junior Sales Officer">Marketing Officer</option>
                        <option value="Delivary Man">Marketing Officer</option>
                    </select>
                    {errors.position && <p role="alert" className="error">{errors.position?.message}</p>}


                    <input type="text" {...register("employeename", { required: "**Required**" })} placeholder="Write Employee Name" />
                    {errors.employeename && <p role="alert" className="error">{errors.employeename.message}</p>}
                    <input type="text" {...register("fname", { required: "**Required**" })} placeholder="What's your father name ?" />
                    {errors.fname && <p role="alert" className="error">{errors.fname.message}</p>}
                    <input type="text" {...register("mname", { required: "**Required**" })} placeholder="What's ypur mother's name ?" />
                    {errors.mname && <p role="alert" className="error">{errors.mname.message}</p>}
                    <input type="text" {...register("nationality", { required: "**Required**" })} placeholder="What is your Nationality ?" />
                    {errors.nationality && <p role="alert" className="error">{errors.nationality.message}</p>}
                    <input type="date" {...register("dob", { required: "**Required**" })} placeholder="What is your Date of Birth ?" />
                    {errors.dob && <p role="alert" className="error">{errors.dob.message}</p>}
                    <input type="file" onChange={handleFileInputChange} ref={fileInputRef} />

                    <p>Parmanent Address</p>
                    <input type="text" {...register("pstree", { required: "**Required**" })} placeholder="STREET" />
                    {errors.pstree && <p role="alert" className="error">{errors.pstree.message}</p>}
                    <input type="text" {...register("phouse", { required: "**Required**" })} placeholder="HOUSE or HOME TOWN" />
                    {errors.phouse && <p role="alert" className="error">{errors.phouse.message}</p>}
                    <input type="text" {...register("pCity", { required: "**Required**" })} placeholder="CITY" />
                    {errors.pCity && <p role="alert" className="error">{errors.pCity.message}</p>}
                    <input type="text" {...register("ppostoffice", { required: "**Required**" })} placeholder="POST OFFICE" />
                    {errors.ppostoffice && <p role="alert" className="error">{errors.ppostoffice.message}</p>}
                    <input type="text" {...register("ppostcode", { required: "**Required**" })} placeholder="POST CODE" />
                    {errors.ppostcode && <p role="alert" className="error">{errors.ppostcode.message}</p>}

                    <p>Present Address</p>
                    <input type="text" {...register("parstree", { required: "**Required**" })} placeholder="STREET" />
                    <input type="text" {...register("parhouse", { required: "**Required**" })} placeholder="HOUSE or HOME TOWN" />
                    <input type="text" {...register("parCity", { required: "**Required**" })} placeholder="CITY" />
                    <input type="text" {...register("parpostoffice", { required: "**Required**" })} placeholder="POST OFFICE" />
                    <input type="text" {...register("parpostcode", { required: "**Required**" })} placeholder="POST CODE" />

                    <p>Contact </p>
                    <input type="text" {...register("mobilenumber", { required: "**Required**" })} placeholder="mobile number" />
                    {errors.mobilenumber && <p role="alert" className="error">{errors.mobilenumber.message}</p>}
                    <input type="text" {...register("alternatenumber", { required: "**Required**" })} placeholder="Alternate Number" />
                    {errors.alternatenumber && <p role="alert" className="error">{errors.alternatenumber.message}</p>}
                    <input type="text" {...register("officenumber", { required: "**Required**" })} placeholder="OFFICE NUMBER" />
                    {errors.officenumber && <p role="alert" className="error">{errors.officenumber.message}</p>}
                    <input type="email" {...register("employeeEmail", { required: "**Required**" })} placeholder="E-mail address" />
                    {errors.employeeEmail && <p role="alert" className="error">{errors.employeeEmail.message}</p>}

                    <p>Others </p>
                    <input type="date" {...register("joiningdate", { required: "**Required**" })} placeholder="Date of join" />
                    <input type="salary" {...register("salary", { required: "**Required**" })} placeholder="Renumeartion" />


                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
        </div>
    </div>
);
}