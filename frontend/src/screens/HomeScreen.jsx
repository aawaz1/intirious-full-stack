import React from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/product/Product';
import Loader from '../components/Loader/Loader';
import Message from '../message/Message';
import "./homescreen.css";
import HeroSection from '../components/HeroSection';

const HomeScreen = () => {
  const {data : products,isLoading, error} = useGetProductsQuery();
  





  return (
    <>
    <HeroSection/>
    <div className='homepage-wrapper'>
      {isLoading ? ( <Loader/> ) : error ? ( <Message variant='danger'>{error?.data?.message || error.error}</Message> ) : (<><h1 style={{width:"100%",padding:"10px 20px",fontFamily:"sans-serif" }}>Latest Products</h1>
      <div className='home-wrapper'>
      {products.map((product) => {

        return(
            <Product product={product}/>
        )
      },[])

      }
      </div></>)}
      
    </div>
    </>
  )
}

export default HomeScreen
