import axios from "axios";
import DeliveryLayout from "../layout/deliverylayout";
import React, { useState, useEffect } from "react";

export default function DeliveryReports(){
  const [deliveryPersons, setDeliveryPersons] = useState([]);

  function alldelivaryman(){
    axios.get('http://localhost:3001/finddeliveryman')
    .then((res)=>{
      setDeliveryPersons(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
      alldelivaryman();
  },[])
   return(
    <div>
    <DeliveryLayout/>
    <div className="delivery-person-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveryPersons.map(person => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.employeename}</td>
              <td>{person.customerEmail}</td>
              <td>{person.mobilenumber}</td>
              <td>Scheduled</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>   
   )
}