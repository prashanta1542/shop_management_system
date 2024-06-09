import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import '../../css/layout/productlayout.css';


export default function DeliveryLayout(){
    return(
        <div className="productlayout">
            
                   <p>
                   <a href="/001.002.003/deliverylist">List Of Delivery Persons</a>
                    </p> 
                    <p>
                   <a href="/001.002.003/deliverylist/addnew">Add new delivery member</a>
                    </p> 
                
                    <p>
                    <a href="/001.002.003/deliverylist/deliveryreports">Active Delivery</a>
                    </p>
                
                    
                    
               
          
        </div>
    )
}