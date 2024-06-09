import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

export default function CatagoryInsert() {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm();

  const onSubmit = data => {
    const formData = new FormData();



    formData.append('catagory', data.catagory);

    axios.post('http://localhost:3001/catagoryinsert', formData, {
      headers: {
        'Content-Type': 'application/json'
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

  return (
    <div style={{ padding: "calc((100vh - 500px) / 2) 0", backgroundColor: "aqua", height: "100vh" }}>
      <div className="product-insert">
        <p>Products Insert</p>
        <div className="product-insert-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("catagory", { required: "**Required**" })} placeholder="Insert Catagory" />
            <input type="submit" value="Submit" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}
