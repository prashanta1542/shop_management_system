import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsCart4 } from 'react-icons/bs'
import { BsFillSearchHeartFill } from 'react-icons/bs';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import '../css/header.css';
export default function Header() {
    const navigate = useNavigate();
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartproduct'))?.length || '0');
    const [catagory, setGetCatagory] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const getCatagory = () => {
        axios.get('http://localhost:3001/selectcatagory')
            .then((res) => {
                setGetCatagory(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

    const getCart = () => {
        navigate('/cart');
    }

    const submitsearch = () => {
        navigate(`/search/${searchItem}`);
        window.location.reload();
    }
    useEffect(() => {

        setInterval(() => {

            setCartItem(JSON.parse(localStorage.getItem('cartproduct'))?.length || '0')


        }, 1000)
        getCatagory();

    }, []);






    return (
        <div>
            <div className="notification">
                <p>We are excited to announce the launch of our latest product</p>
            </div>
            <div className="top-header">
                <div className="cart-header" onClick={getCart}>
                    <div>
                        <p>Your Cart</p>
                        <p>{cartItem}</p>
                    </div>
                    <div>
                        <BsCart4 />
                    </div>
                </div>
                <div className="search-header">
                    <div>
                        <BsFillSearchHeartFill onClick={submitsearch} />
                        <form>
                            <input type="text" onChange={(e) => { setSearchItem(e.target.value) }} />
                        </form>
                    </div>
                    {
                        searchItem !== '' &&
                        catagory.filter((product) => {
                            if (product.catagory.toLowerCase().includes(searchItem.toLowerCase())) {
                                return true;
                            } else {
                                return false;
                            }
                        }).map((product) => (
                            <p key={product.id} className="search-item-box">{product.catagory}</p>
                        ))
                    }
                </div>
                <div className="contact-header">
                    <div>
                        <p>Phone</p>
                        <p>0188-2652140</p>
                    </div>
                    <div>
                        <BsFillTelephoneOutboundFill />
                    </div>
                </div>
                <div className="icon-header">
                    <p>YourShopHome</p>
                </div>
            </div>
            <div className="nav-header">
                <p>
                    <a href="#">CONTACT</a></p>
                <p>
                    <a href="#">NEWS</a></p>
                <p>
                    <a href="#">PORTFOLIO</a></p>
                <p>
                    <a href="/searchorder">CHECK ORDER</a></p>
                <p>CHOOSE CATAGORIES
                    <div className="dropdown">
                        {catagory.map((item) => (
                            <p key={item.id}>
                                <a href={`/search/${encodeURIComponent(item.catagory)}`}>{item.catagory}</a>
                            </p>
                        ))}
                    </div>
                </p>
                <p>
                    <a href="/">HOME</a></p>
            </div>
        </div>
    )
}