import React from "react";
import { useParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Rating from "../components/rating/Rating";
import Loader from "../components/Loader/Loader";
import "./productScreen.css";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Message from "../message/Message";
import { useState } from "react";
import {Row, Form, Col, ListGroup } from "react-bootstrap";
import {addToCart} from '../slices/cartSlice'

 
const ProductScreen = () => {
 
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  
  const navigate = useNavigate();
  const {data : product,isLoading, error} = useGetProductDetailsQuery(productId);
  const addToCartHandler = () => {
    dispatch(addToCart({
      ...product , qty
    }));
    navigate("/cart");

  }
  


  



  
  
  
  

  return (
    <>
    <div className="productScreen-wrapper">
      {/* btn-wrapper */}
      <div className="btn-wrapper">
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
      {
        isLoading ? ( <Loader/> ) : error  ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : ( 
        <div className="productScreen-content">
          {/* product image */}
          <div className="productScreen-img">
            <img src={product.image} />
          </div>
  
          {/* product details */}
          <div className="productScreen-details">
            {/* seller name */}
            <div className="seller-details">
              <span>Brand:</span> Intirious Design & Collection
            </div>
  
            {/* product title */}
            <div className="productScreen-title">
              <h2>{product.name}</h2>
            </div>
  
            {/* star rating */}
            <div className="productScreen-star">
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </div>
  
            {/* product price */}
            <div className="productScreen-price">&#8377;{product.price}</div>
  
            {/* product status */}
            <div className="productScreen-status">
              <span>
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>

            {
              product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty
                    </Col>
                    <Col> <Form.Control as="select"
                                         value={qty}
                                         onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => ( <option key={x +1} value={x +1}>
                        {x +1}

                      </option>))}

                      </Form.Control>   </Col>
                  </Row>
                </ListGroup.Item>
              )
            }
  
            {/* product description */}
            <div className="productScreen-desc">{product.description}</div>

          
  
            {/* add to cart button */}
            <div className="addCart-btn">
              <button
                style={{
                  background: `${product.countInStock === 0 ? "red" : ""}`,color: `${product.countInStock === 0 ? "white" : ""}`
                }}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock === 0 ? "Out of stock" : "Add To Cart"}
              </button>
            </div>
          </div>
          </div> )
      }

      
       
    </div>
    </>
  );
};

export default ProductScreen;
