import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

export default function ProductsInsert() {
  const { register, handleSubmit, formState: { errors } , reset} = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [catagory,setCatagory]=useState([]);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const getCatagory = ()=>{
    axios.get('http://localhost:3001/selectcatagory')
    .then((res)=>{
      setCatagory(res.data)
    }).catch(err=>{
      console.error(err);
    })
  }
  const onSubmit = data => {
    const formData = new FormData();



    formData.append('catagory', data.catagory);
    formData.append('pname', data.pname);
    formData.append('pdetails', data.pdetails);
    formData.append('price', data.price);
    formData.append('size', data.size);
    formData.append('color', data.color);
    formData.append('image', selectedFile);
    formData.append('quantity', data.quantity);

    axios.post('http://localhost:3001/productinsert', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        reset();
      })
      .catch(error => {
        console.error(error);
      });
    console.log(formData)
  }
  
  useEffect(()=>{
    getCatagory();
  },[])

  return (
    <div style={{ padding: "calc((100vh - 500px) / 2) 0", backgroundColor: "aqua", height: "100vh" }}>
      <div className="product-insert">
        <p>Products Insert</p>
        <div className="product-insert-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("catagory")}>
              <option>Select Catagory</option>
              {
                  catagory.map((item)=>{
                    return(
                      <option value={item.catagory}>{item.catagory}</option>
                    )
                  })
              }
            
            </select>
            <input type="text" {...register("pname", { required: "**Required**" })} placeholder="Product Name" />
            <input type="text" {...register("color", { required: "**Required**" })} placeholder="Product Color" />
            <input type="text" {...register("size", { required: "**Required**" })} placeholder="Product Size" />
            <textarea {...register("pdetails", { required: "**Required**" })} placeholder="Product Details" />
            <input type="number" {...register("price", { required: "**Required**" })} placeholder="Product Price" />
            <input type="file" onChange={handleFileInputChange} ref={fileInputRef} />
            <input type="number" {...register("quantity", { required: "**Required**" })} placeholder="Quantity" />
            <input type="submit" value="Submit" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}
