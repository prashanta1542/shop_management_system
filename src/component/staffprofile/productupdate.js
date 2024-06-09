import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import '../../css/staffprofile/productinsert.css';
import { useParams } from "react-router-dom";


export default function ProductsUpdate() {
  const { register, handleSubmit, watch, formState: { errors } ,reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [catagory, setCatagory] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState([]);


  const getCatagory = () => {
    axios.get('http://localhost:3001/selectcatagory')
      .then((res) => {
        setCatagory(res.data)
      }).catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data)
      }).catch((error) => {
        console.error('Error fetching products:', error);
      });
      getCatagory();
  }, [id])

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('id',id);
    formData.append('catagory', data.catagory);
    formData.append('pname', data.pname);
    formData.append('pdetails', data.pdetails);
    formData.append('price', data.price);
    formData.append('image', selectedFile);
    formData.append('quantity', data.quantity);
    axios.post('http://localhost:3001/productupdate', formData, {
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
    console.log(formData);
  };

 

  return (
    <div style={{ padding: "calc((100vh - 500px) / 2) 0", backgroundColor: "aqua", height: "100vh" }}>
      <div className="product-insert">
        <p>Product Update</p>
        <div className="product-insert-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("catagory")}>
              <option>Select Catagory</option>
              {
                catagory.map((item) => {
                  return (
                    <option value={item.catagory} key={item.id}>{item.catagory}</option>
                  )
                })
              }

            </select>
            <input type="text" {...register("pname", { required: "**Required**" })} defaultValue={product.productName} />
            <textarea {...register("pdetails", { required: "**Required**" })} defaultValue={product.productDetail} />
            <input type="number" {...register("price", { required: "**Required**" })} defaultValue={product.price} />
            <input type="file" onChange={handleFileInputChange} ref={fileInputRef} />
            <input type="number" {...register("quantity", { required: "**Required**" })} defaultValue={product.quantity} />
            <input type="submit" value="Update" className="button" />
          </form>
        </div>
      </div>
    </div>
  )
}