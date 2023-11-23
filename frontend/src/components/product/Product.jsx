import React from 'react';
import Rating from '../rating/Rating';
import { useNavigate } from 'react-router-dom';
import "./product.css";

const Product = ({product}) => {
const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${product._id}`)} className='card-wrapper'>

    {/* card image */}
    <div className='card-img-wrapper'>
    <img src={product.image} alt='photo'/>
    </div>
      

      {/* card title */}

      <div className='card-title'>
      <p>
      {
        product.name
      }
      </p>
      </div>

      {/* card rating */}

      <div className='card-rating'>
      <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
      </div>

      {/* card price */}
      <div className='card-price'>
      <p>&#8377;{product.price}</p>
      </div>


    </div>
  )
}

export default Product
