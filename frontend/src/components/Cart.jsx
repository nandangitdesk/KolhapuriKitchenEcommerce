import React, { useEffect } from 'react';
import Loader from './layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import CartItemCard from './layouts/CartItemCard';
import MetaData from './layouts/MetaData';
import Navbar from './layouts/Navbar';
import { addItemToCart ,removeItemFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  const increaseQuantity = (id,quantity,stock) =>{
    const newQty = quantity + 1;
    if(stock <= quantity)  {
      return;
    }
    dispatch(addItemToCart(id,newQty ));
  }
  const decreaseQuantity = (id,quantity) =>{
    const newQty = quantity - 1;
    if(1 >= quantity)  {
      return;
    }
    dispatch(addItemToCart(id,newQty ));
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  } 

  const checkOutHandler = () => {
    // Navigate to checkout page
    navigate("/login?redirect=shipping");
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='cartPage text-black mt-24 bg-white shadow-md rounded-lg p-4 max-w-5xl mx-auto'>
          <Navbar />
          <MetaData title="Cart" />
          <h1 className='mt-4 text-center font-bold text-[#000000] text-3xl mb-10'>My Cart</h1>
          <div className='cartHeader flex justify-between items-center mb-4 md:flex-row md:justify-between bg-zinc-200 p-4 text-black'>
            <p className='md:text-xl font-semibold mb-2 md:mb-0'>Product</p>
            <p className='md:text-xl font-semibold mb-2 md:mb-0'>Quantity</p>
            <p className='md:text-xl font-semibold mb-2 md:mb-0'>Subtotal</p>
          </div>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product} className='cartContainer flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between mt-5 border-[.5px] border-zinc-300 p-2'>
                <div className='flex flex-col items-center md:flex-row lg:flex-row'>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className='cartInput flex items-center mt-2 md:ml-40 '>
                    <button onClick={()=> decreaseQuantity(item.product,item.quantity)} className='bg-gray-200 text-black px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-gray-300 transition duration-200'>-</button>
                    <input
                      type='number'
                      value={item.quantity || 0}
                      readOnly
                      className='h-7 w-11 md:h-10 md:w-16 border border-gray-300 rounded-md text-center mx-4 outline-none'
                    />
                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}className='bg-gray-200 text-black px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-gray-300 transition duration-200'>+</button>
                  </div>
                </div>
                <div className='flex items-center mt-2 md:mt-0'>
                  <p className='cartTotal text-lg font-semibold'>{`Total: ₹${item.price * item.quantity}`}</p>
                </div>
              </div>
            ))
          ) : (
              <div className='flex flex-col items-center mt-2'>
                <p className="text-center text-lg">Your cart is empty</p>
                <Link to="/products" className='text-center text-lg text-red-400 hover:text-red-500'>View Products</Link>
              </div>
          )}
          {cartItems.length >= 1 && (
            <div className='cartGrossTotal flex flex-col items-end mt-10 p-5 w-fit border-t-[1px] border-zinc-400'>
              <div className='cartGrossProfitBox flex flex-col items-center'>
                <p className='text-lg font-semibold'>Gross Profit</p>
                <p className='text-lg font-semibold'>
                  {`Total: ₹${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}
                </p>
              </div>
              <div className='checkOutBtn mt-4'>
                <button onClick={checkOutHandler} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200'>Check Out</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
