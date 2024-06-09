import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/products.css';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { BsChevronDoubleRight } from 'react-icons/bs';


export default function Product({ cart, catagory }) {
  const [getProduct, setGetProduct] = useState([]);
  const [getcatagory, setCatagory] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [orderNo, setorderNo] = useState(4);

  function fetchcatagory() {

    axios.get(`http://localhost:3001/selectcatagory`)
      .then((res) => {
        setCatagory(res.data)
      }).catch((err) => {
        console.log(err);
      })

  }

  function fetchproduct() {
    axios.get('http://localhost:3001/getproduct')
      .then((response) => {
        setGetProduct(response.data);

      }).catch((error) => {
        console.error('Error fetching products:', error);
      });
  }
  useEffect(() => {
    fetchproduct();
    fetchcatagory();

  }, []);

  const lastorderindex = currentpage * orderNo;
  const firstorderindex = lastorderindex - orderNo;
  const showOrder = getProduct.slice(firstorderindex, lastorderindex);


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
//pasignation for catagory
  const lastindex = currentpage * orderNo;
  const firstindex = lastorderindex - orderNo;
  const showCat = getcatagory.slice(firstindex, lastindex);


  return (
    <div>
      <div className="catagory-box">
           {
            showCat.map((cat)=>{
                return(
                  <div className="catagory" key={cat.id}>
                     {/* <p>{cat.catagory}</p> */}
                     <p> <a href={`/search/${encodeURIComponent(cat.catagory)}`}>{cat.catagory}</a></p>
                  </div>
                )
            })
           }
      </div>
      <div className="products">
        <div className="products-flex">
          {
            showOrder.map((products) => {
              return (

                <div className="listed-products" key={products.id}>
                  <div className="product-card">
                    <img src={`http://localhost:3001/uploads/${products.photo}`} />
                    <div className="product-description">
                       {/*<p>{products.catagory}</p>
                      <p>{products.price}</p> */}
                      <p>
                        <Link to={`/productdetails/${products.catagory}/${products.id}`}>Details</Link>
                      </p>
                      <div className="product-action">
                        <p onClick={() => { cart(products) }}>CART</p>
                        <p><Link to={`/productbuyform/${products.id}`}>BUY</Link></p>
                      </div>
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>
        <div className="pagisnation">
          <button onClick={() => previousPage()} className="prevbtn"><BsChevronDoubleLeft /></button>
          <button onClick={() => nextPage()} className="nextbtn"><BsChevronDoubleRight /></button>
        </div>
      </div>

      <div>
        {getcatagory.map((cat) => {
          // Filter the getProduct array to only include products that match this category
          const productsForCategory = getProduct.filter((product) => product.catagory === cat.catagory);

          // If there are no products for this category, don't render anything
          if (productsForCategory.length === 0) {
            return null;
          }

          // Render the category name and the products for this category
          return (
            <div className="products">
              <p className="products-catagory" >Category: {cat.catagory}</p>
              <div className="products-flex">
              {productsForCategory.map((product) => (
                <div className="listed-products" key={product.id}>
                  <div className="product-card">
                    <img src={`http://localhost:3001/uploads/${product.photo}`} />
                    <div className="product-description">
                      <p>{product.productName}</p>
                      <p>{product.price}</p>
                      <p>
                        <Link to={`/productdetails/${product.catagory}/${product.id}`}>Details</Link>
                      </p>
                      <div className="product-action">
                        <p onClick={() => { cart(product) }}>CART</p>
                        <p><Link to={`/productbuyform/${product.id}`}>BUY</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>





  )
}