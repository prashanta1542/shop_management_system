import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from "./footer";
import '../css/productdetails.css'

const ProductDetails = () => {
    const { id } = useParams();
    const { cat } = useParams();
    const [getProduct, setGetProduct] = useState([]);
    const [recomProduct, setRecomProduct] = useState([])
    function fetchproduct(id) {
        axios.get(`http://localhost:3001/getproductbycatagory/${id}`)
            .then((response) => {
                setRecomProduct(response.data);
            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/product/${id}`)
            .then((response) => {
                setGetProduct(response.data);

            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
        fetchproduct(cat)

    }, []);

    return (
        <div>
            <Header />
            <div className="prouct-details-containers">
                <h1 className="prouct-details-header">Product Details</h1>
                <div className="prouct-details-body">
                    <div className="prouct-details-image">
                        <img src={`http://localhost:3001/uploads/${getProduct.photo}`} />
                    </div>
                    <div className="prouct-details-options">
                        <p>{getProduct.productName}</p>
                        <p>{getProduct.price}</p>
                        <p>Ratings</p>
                        <p><Link to={`/productbuyform/${id}`}>BUY</Link></p>
                        <p>CART</p>
                    </div>
                    <div className="prouct-details-descriptions">
                        <p>{getProduct.productDetail}</p>
                    </div>
                </div>
            </div>

            <div>
                <p className="similarProducts">Similar Products</p>
                <div className="products" >
                    <div className="products-flex">
                        {
                            recomProduct
                                .map((products) => {
                                    return (

                                        <div className="listed-products" key={products.id}>
                                            <div className="product-card">
                                                <img src={`http://localhost:3001/uploads/${products.photo}`} />
                                                <div className="product-description">
                                                    <p>
                                                        <Link to={`/productdetails/${products.catagory}/${products.id}`}>Details</Link>
                                                    </p>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                        }
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ProductDetails;