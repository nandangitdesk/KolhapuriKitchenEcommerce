import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../actions/orderAction';
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loader';
import Typography from '@mui/material/Typography';
import Navbar from './layouts/Navbar';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      <MetaData title="Order Details" />
      <Navbar/>
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetailsPage p-4 md:p-6 lg:p-8 xl:p-10 mt-10">
          <div className="orderDetailsContainer max-w-full mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 xl:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Order #{order?._id}</h1>
            
            <h3 className="text-xl md:text-2xl font-semibold text-gray-500 mb-6">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-semibold">Name:</label>
                <p className="text-gray-600">{order?.user?.name}</p>
              </div>
              <div>
                <label className="font-semibold">Email:</label>
                <p className="text-gray-600">{order?.user?.email}</p>
              </div>
              <div>
                <label className="font-semibold">Address:</label>
                <p className="text-gray-600">
                  {order?.shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`}
                </p>
              </div>
              <div>
                <label className="font-semibold">Phone No:</label>
                <p className="text-gray-600">{order?.shippingInfo?.phoneNo}</p>
              </div>
            </div>

            <div className="mb-6">
              <Typography className="text-lg font-semibold text-gray-700">Payment</Typography>
              <p className={order?.paymentInfo?.status === "succeeded" ? "text-green-500" : "text-red-500"}>
                {order?.paymentInfo?.status === "succeeded" ? "Payment Successful" : "Payment Failed"}
              </p>
              <p>Amount: <span className="font-bold">₹{order?.totalPrice}</span></p>
            </div>

            <Typography className="text-xl font-semibold text-gray-700 mb-4">Order Status</Typography>
            <div className="orderStatus mb-6">
              <p className={order?.orderStatus === "Delivered" ? "text-green-500" : "text-red-500"}>
                {order?.orderStatus}
              </p>
            </div>

            <div className="orderDetailsCartContainer">
              <Typography className="text-lg font-semibold text-gray-700 mb-2">Order Items:</Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order?.orderItems?.map((item) => (
                  <div key={item.product} className="flex items-center w-full p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 gap-2">
                    <img src={item?.image} alt="Product" className="w-12 h-12 object-cover rounded mr-4" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center w-full">
                      <Link to={`/product/${item.product}`} className="text-blue-500 hover:text-blue-700 transition duration-200 font-semibold mb-2 sm:mb-0">
                        {item.name}
                      </Link>
                      <span className=" ml-5 text-gray-600 ">
                        {item.quantity} X ₹{item.price} = 
                        <b className="ml-1 text-gray-800">₹{item.quantity * item.price}</b>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
