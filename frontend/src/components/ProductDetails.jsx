import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, newReview } from '../actions/productAction';
import MetaData from './layouts/MetaData';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Loader from './layouts/Loader';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import productImage from '../assets/images/kolhapuritikhat 1.webp';
import ReviewCard from './ReviewCard';
import {addItemToCart} from "../actions/cartAction"
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Rating } from "@mui/material"; 
import { clearErrors } from '../actions/orderAction';
import { NEW_REVIEW_RESET } from '../constants/productConstant';
import { Star, StarBorder } from '@mui/icons-material';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const {success , error: reviewError } = useSelector((state) => state.newReview);
  const { id } = useParams();

  useEffect(() => {
    if(error) {
      alert(reviewError);
      dispatch(clearErrors())
    }
    if(success) {
      alert("Review submitted successfully")
      dispatch({type:NEW_REVIEW_RESET})
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id , success, error, reviewError , alert]);

  const options = {
    value: product ? product.ratings : 0,
    readOnly:true,
    size: "large",
    precision:0.5,
    icon: <Star fontSize="inherit" style={{ color: "#ffc107" }} />,
    emptyIcon: <StarBorder fontSize="inherit" style={{ color: "#ffc107" }} />
  };

  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const decreaseQuantity = () =>{
    if(1 >= quantity)  return;
    const qty = quantity - 1;
    setQuantity(qty)
  }

  const increaseQuantity = () =>{
    if(product.stock <= quantity)  return;
    const qty = quantity + 1;
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemToCart(id, quantity));
      alert("Item added to cart");
    } else {
      alert("This product is currently out of stock");
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }
  
  const reviewSubmitHandler = ()=>{
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);
    dispatch(newReview (myForm));
    setOpen(false);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <MetaData title={`${product.name} - Product Details`} />
      <Navbar />
      <div className='container mx-auto mt-32 px-8 flex flex-col md:flex-row gap-10 items-center'>
        <div className='w-full md:w-[35%] p-5 flex items-center justify-center bg-zinc-100 '>
          <img src={product.images && product.images[0] ? product.images[0].url : productImage} alt={product.name} className='w-3/4 h-3/4 object-contain' />
        </div>
        <div className='w-full md:w-[60%] '>
          <h1 className='text-4xl font-bold mb-2'>{product.name}</h1>
          <div className='flex items-center mb-4'>
            <Rating {...options} />
            <span className='ml-2 text-gray-600'>{product.numOfReviews} reviews</span>
          </div>
          <h2 className='text-2xl font-semibold mb-4 text-red-500'>₹{product.price}/Kg</h2>
          <p className='text-[1rem] mb-4 text-gray-700'>{product.description}</p>
          <div className='flex items-center mb-4'>
            <button onClick={decreaseQuantity} className='bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 transition duration-200'>-</button>
            <input
              type='number'
              value={quantity}
              readOnly
              className='h-8 w-12 border border-gray-300 rounded-md text-center mx-2 outline-none'
            />
            <button onClick={increaseQuantity} className='bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300 transition duration-200'>+</button>
          </div>
          <button onClick={addToCartHandler} className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300'>
            Add To Cart
          </button>
          <div className='flex items-center mt-4'>
                <span className="mr-2">Status:</span>
                <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'} px-2 py-1 rounded-md`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                 </p>
          </div>
          <button onClick={submitReviewToggle} className='bg-zinc-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors'>Submit Review</button>
        </div>
      </div>
      <Dialog open={open} onClose={submitReviewToggle} aria-labelledby='alert-dialog-title' className='md:mx-auto'>
        <DialogTitle id='alert-dialog-title' className='text-lg font-bold'>Submit Review</DialogTitle>
        <DialogContent className='submitDialog p-4 md:p-8'>
          <Rating onChange={(e) => setRating(e.target.value)} value={rating} size='large' className='mb-4' />
          <textarea className='submitDialogTextArea w-full md:w-3/4 lg:w-1/2 p-2 border border-gray-300 rounded-md resize-none' rows="5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review here..."></textarea>
        </DialogContent>
        <DialogActions className='flex justify-between p-4 md:p-8'>
          <Button onClick={submitReviewToggle} color="primary" className='px-4 py-2'>
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary" autoFocus className='px-4 py-2'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div className='container mx-auto px-4 py-8'>
                <h2 className='text-2xl md:text-3xl font-bold text-center mt-20'>Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-500'>No reviews yet</p>
                )}
            </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
