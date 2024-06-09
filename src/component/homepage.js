import React, { useEffect, useState } from 'react';
import Header from './header';
import Background from './background';
import Product from './products';
import axios from 'axios';
import Cart from './cart';
import Footer from './footer';


export default function Homepage() {
    const [productItems, setProductItems] = useState(JSON.parse(localStorage.getItem('cartproduct')) || []);
    const [catagory, setGetCatagory]= useState([]);
    const [product,setproduct]=useState([]);
    const handleProductCart = (product) => {
        const existingProduct = productItems.find((p) => p.id === product.id);
        if (existingProduct) {
            console.log('Already in cart')
        } else {
            const newProductItems = [...productItems, product];
            localStorage.setItem('cartproduct', JSON.stringify(newProductItems));
            setProductItems(newProductItems);
        }
    };
    const getCatagory = ()=>{
        axios.get('http://localhost:3001/selectcatagory')
        .then((res)=>{
            setGetCatagory(res.data)
        }).catch(err=>{
          console.error(err);
        })
      }
    
    const getProduct=()=>{
        axios.get('http://localhost:3001/getproduct')
        .then((response) => {
            setproduct(response.data);
          console.log(response.data)
        }).catch((error) => {
          console.error('Error fetching products:', error);
        });
    }

    useEffect(()=>{
        getCatagory();
        getProduct();
    },[])

    return (

        <div>
            
            <Header />
            <Background />
            <Product cart={handleProductCart} /> 
            <Footer/>
        </div>
    )
}