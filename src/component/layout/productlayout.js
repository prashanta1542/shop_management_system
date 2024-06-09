import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import '../../css/layout/productlayout.css';


export default function ProductLayout(){
    return(
        <div className="productlayout">
            
                   <p>
                   <Link>List Of Product</Link>
                    </p> 
                
                    <p>
                    <Link to="productinsert">Insert New Product</Link>
                    </p>

                    <p>
                    <Link to="catagoryinsert">Insert New Catagory</Link>
                    </p>
        </div>
    )
}