import React, { useState, useEffect } from "react";
import '../../css/staffprofile/productslist.css'
import ProductLayout from "../layout/productlayout";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { BsChevronDoubleRight } from 'react-icons/bs';

export default function ProductsList() {
    const navigate = useNavigate();
    const [getProduct, setGetProduct] = useState([]);
    const [deletemsg, setDeletemsg] = useState('');
    const [currentpage, setCurrentpage] = useState(1);
    const [orderNo, setorderNo] = useState(8);
    const [catagory, setCatagory] = useState([]);
    const [searchCatagory, getsearchCatagory] = useState('');

    const getCatagory = () => {
        axios.get('http://localhost:3001/selectcatagory')
            .then((res) => {
                setCatagory(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

    const fetchProduct = () => {
        axios.get('http://localhost:3001/getproduct')
            .then((response) => {
                setGetProduct(response.data);
                console.log(response.data)
            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
    }

    const updateProduct = (id) => {
        navigate('productupdate/' + id);
    }
    const deleteProduct = (id) => {
        axios.get(`http://localhost:3001/productdeletebyid/${id}`)
            .then((res) => {
                setDeletemsg(res);
                axios.get('http://localhost:3001/getproduct')
                    .then((response) => {
                        setGetProduct(response.data);
                        console.log(response.data)
                    }).catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            }).catch(err => {
                console.error("Failed operation", err)
            })
    }
    useEffect(() => {
        fetchProduct();
        getCatagory();
    }, []);

    const lastorderindex = currentpage * orderNo;
    const firstorderindex = lastorderindex - orderNo;
    const showList = getProduct.slice(firstorderindex, lastorderindex);

    function previousPage() {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    }

    function nextPage() {
        if (currentpage < Math.ceil(getProduct.length / orderNo)) {
            setCurrentpage(currentpage + 1);
        }
        else {
            setCurrentpage(1);
        }
    }

    return (
        <div>
            <ProductLayout />
            <div className="search-pro-cat">

                <input type="text" onChange={(e) => { getsearchCatagory(e.target.value) }} placeholder="Search by catagory...." />
                <select onChange={(e) => { getsearchCatagory(e.target.value) }}>
                    <option>Select Catagory</option>
                    {
                        catagory.map((item) => {
                            return (
                                <option value={item.catagory}>{item.catagory}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="product-list">
                <h2>Product List</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showList.filter((product) => {
                            if (product.catagory.toLowerCase().includes(searchCatagory.toLowerCase())) {
                                return true;
                            }
                            else {
                                return false;
                            }

                        }).map((product) => (
                            <tr key={product.id}>
                                <td>{product.catagory}</td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>
                                    <p onClick={() => { updateProduct(product.id) }} className="tableupdatebtn">Update</p>
                                </td>
                                <td>
                                    <p onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this product?")) {
                                            deleteProduct(product.id);
                                        }
                                    }} className="tabledeletebtn">Delete</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="handlecarousel" colSpan={5}>
                                <BsChevronDoubleLeft onClick={() => previousPage()} />
                                <BsChevronDoubleRight onClick={() => nextPage()} />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    )
}