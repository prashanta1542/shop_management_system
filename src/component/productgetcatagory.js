import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from "./footer";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import '../css/products.css';

export default function ProductGetByCatagory({ cart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [catagory, setGetCatagory] = useState([]);
    const [getProduct, setGetProduct] = useState([]);
    const [horizontal, setHorizontal] = useState('block');
    const [verticle, setVerticle] = useState('none');
    const [curColor, setcurColor] = useState('');
    const [curPrice, setCurPrice] = useState('');
    const [price, setPrice] = useState('');
    const getCatagory = () => {
        axios.get('http://localhost:3001/selectcatagory')
            .then((res) => {
                setGetCatagory(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    function fetchproduct() {
        axios.get(`http://localhost:3001/getproductbycatagory/${id}`)
            .then((response) => {
                setGetProduct(response.data);

            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
    }
    function updateColor(color) {
        setcurColor(color);
        setPrice(curPrice)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
        setcurColor('')
    }

    useEffect(() => {
        fetchproduct();
        getCatagory();
    }, []);
    useEffect(() => {
        let priceArr = getProduct.map((e) => e.price);
        let maxPrice = priceArr.length > 0 ? Math.max(...priceArr) : 0;
        setCurPrice(maxPrice);
    }, [getProduct]);

    useEffect(() => {
        setPrice(curPrice);
    }, [curPrice]);

    return (
        <div>
            <Header />
            <div className="main-row">
                <div className="column-1">
                    <div className="setvertical">
                        <p onClick={() => { setVerticle('block'); setHorizontal('none') }}><BsFillGrid3X2GapFill /></p>
                        <p onClick={() => { setVerticle('none'); setHorizontal('block') }}><BsFillGrid3X3GapFill /></p>
                    </div>
                    <p className="primary-p">FILTER OPTION</p>
                    {(getProduct.length === 0) ? '' : (<div className="filter-option">
                        <p className="main-p">SIZE</p>
                        <div className="sizes">
                             
                            <span onClick={() => { setcurColor('') }}>All</span>
                            {
                                getProduct.map((colors, index) => {
                                    return (
                                        <span key={index} onClick={() => { updateColor(colors.color) }} style={{ backgroundColor: colors.color }} className="color-chooser"></span>
                                    )
                                })
                            }
                        </div>
                        <p className="main-p">PRICE</p>
                        <div className="prices">
                            <input
                                type="range"
                                value={price}
                                min={0}
                                max={curPrice}
                                onChange={(e) => handlePrice(e)}
                            />
                            <span>{price}</span>
                        </div>

                        <div className="catagories">
                            <p className="main-p">Choose catagory</p>
                            <div>
                                {catagory.map((item) => (
                                    <p key={item.id}>
                                        <a href={`/search/${encodeURIComponent(item.catagory)}`}>{item.catagory}</a>
                                    </p>
                                ))}
                            </div>
                        </div>

                    </div>)}
                </div>
                <div className="column-2">
                    {(getProduct.length === 0) ?
                        <p style={{
                            display: verticle,
                            textAlign: 'center',
                            fontSize: '80px',
                            margin: '20px 0px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'red',
                            transition: ' 0.3s ease-in-out'
                        }}>No Product Found</p> : (
                            <div className="products" style={{ display: verticle }}>
                                <div className="products-flex">
                                    {
                                        getProduct
                                            .filter((product) => {
                                                if (curColor) {
                                                    if (product.color.includes(curColor)) {
                                                        return true
                                                    } else { return false }
                                                }
                                                if (price) {
                                                    if (product.price <= price) {
                                                        return true
                                                    } else { return false }
                                                }
                                            })
                                            .map((products) => {
                                                return (

                                                    <div className="listed-products" key={products.id}>
                                                        <div className="product-card">
                                                            <img src={`http://localhost:3001/uploads/${products.photo}`} />
                                                            <div className="product-description">
                                                                <p>{products.productName}</p>
                                                                <p>{products.price}</p>
                                                                <p>
                                                                <Link to={`/productdetails/${products.catagory}/${products.id}`}>Details</Link>
                                                                </p>
                                                                <div className="product-action">
                                                                    {/* <p onClick={() => { cart(products) }}>CART</p> */}

                                                                    <p><Link to={`/productbuyform/${products.id}`}>BUY</Link></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                    }
                                </div>
                            </div>)}

                    {(getProduct.length === 0) ? <p
                        style={{
                            display: horizontal,
                            textAlign: 'center',
                            fontSize: '80px',
                            margin: '20px 0px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'red',
                            transition: ' 0.3s ease-in-out',
                        }}>No Product Found</p> : (<div className="products" style={{ display: horizontal }}>
                            <div className="products-block">
                                {
                                    getProduct
                                        .filter((product) => {
                                            if (curColor) {
                                                if (product.color.includes(curColor)) {
                                                    return true
                                                } else { return false }
                                            }
                                            if (price) {
                                                if (product.price <= price) {
                                                    return true
                                                } else { return false }
                                            }
                                        })
                                        .map((products) => {
                                            return (

                                                <div className="listed-block-products" key={products.id}>
                                                    <div className="block-product-card">
                                                        <img src={`http://localhost:3001/uploads/${products.photo}`} />
                                                        <div className="product-block-description">
                                                            <p>{products.productName}</p>
                                                            <p>{products.price}</p>
                                                            <p>
                                                            <Link to={`/productdetails/${products.catagory}/${products.id}`}>Details</Link>
                                                            </p>
                                                            <div className="product-block-action">
                                                                {/* <p onClick={() => { cart(products) }}>CART</p>
                                                <p>CART</p> */}
                                                                <p><Link to={`/productbuyform/${products.id}`}>BUY</Link></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })
                                }
                            </div>
                        </div>)}
                </div>
            </div>
            <Footer />
        </div>

    )
}