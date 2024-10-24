import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../actions/productAction';
import Navbar from './layouts/Navbar'
import Carousel from './layouts/Carousel'
import Testimonial from './Testimonial'
import Footer from './layouts/Footer'
import Player from './Player'
import ProductCard from './layouts/ProductCard'
import Loader from './layouts/Loader';
import MetaData from './layouts/MetaData';
import offerBanner from "../../public/offerbanner.webp"

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/${searchTerm}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <>
      <MetaData title="Home" />
      {loading ? <Loader /> : (
        <div className='min-h-screen w-full'>
          <Navbar />
          <form onSubmit={searchSubmitHandler} className='search-bar mt-[3rem] md:mt-[5.5rem] p-10 flex items-center justify-center'>
            <input  
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              type="text" 
              placeholder='Search here...' 
              className='border border-gray-300 outline-none rounded-l-full px-4 py-2 w-[20rem] sm:w-[16rem]' 
            />
            <button className='bg-red-600 text-white rounded-r-full px-4 py-2'>Search</button>
          </form>
          <div className='w-full'>
            <Carousel />
          </div>
          <div id='products' className='w-full mt-10'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Featured Products</h2>
            <div className='flex items-center justify-start space-x-4 overflow-x-auto p-4 md:flex-wrap md:justify-between md:px-20 scrollbar-hide'>
              {products && products.length > 0 ? (
                products.slice(0, 5).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
          
          {/* Rest of your Home component */}
          <div className='offerbanner w-full h-full px-4 sm:px-6 md:px-8 rounded-lg mt-10'>
            <Link to="/products"> <img  src={offerBanner} alt="offerbanner" className='w-full h-auto object-cover rounded-lg' /></Link>
          </div>
          <div className='w-full h-full mt-20 px-8 '>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-4 sm:mb-6'>
              <i className="ri-bard-fill text-red-500 mr-2"></i>
              Celebrate the Journey with Us
            </h1>
            <div className="w-full ">
              <Player />
            </div>
          </div>
          <div className='testimonial w-full h-full mt-20 px-8'>
            <h1 className='text-xl '>Some Of Our Clients <br />Saying About Us <i className="ri-bard-fill text-red-500 mr-2"></i></h1>
            <Testimonial />
          </div>
          <div className='footer w-full h-full mt-10'>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>WHY CHOOSE US ?</h1>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default Home