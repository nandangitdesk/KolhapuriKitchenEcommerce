import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader";
import { AccountTree } from "@mui/icons-material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import Navbar from "../layouts/Navbar";

const EditProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-4 md:p-8">
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto md:ml-72 mt-20">
              <Typography variant="h5" className="text-gray-700 mb-6">
                Process Order
              </Typography>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Shipping Info */}
                <div className="space-y-4">
                  <Typography variant="h6" className="text-gray-800">
                    Shipping Info
                  </Typography>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Phone:</p>
                      <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <Typography variant="h6" className="text-gray-800">
                    Payment
                  </Typography>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-2">
                    <div className="flex justify-between">
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Amount:</p>
                      <span>{order.totalPrice && `₹${order.totalPrice}`}</span>
                    </div>
                  </div>

                  {/* Order Status */}
                  <Typography variant="h6" className="text-gray-800">
                    Order Status
                  </Typography>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-2">
                    <div className="flex justify-between">
                      <p
                        className={
                          order.orderStatus === "Delivered"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cart Items */}
                <div>
                  <Typography variant="h6" className="text-gray-800">
                    Your Cart Items:
                  </Typography>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-4">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div
                          key={item.product}
                          className="flex items-center justify-between space-x-4"
                        >
                          <img
                            className="w-16 h-16 object-cover rounded-md"
                            src={item.image}
                            alt={item.name}
                          />
                          <Link
                            to={`/product/${item.product}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.name}
                          </Link>
                          <span className="text-gray-700">
                            {item.quantity} x ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Order Status Update */}
              {order.orderStatus !== "Delivered" && (
                <form
                  className="mt-8 space-y-6"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h2 className="text-xl font-semibold">Update Order Status</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <AccountTree className="text-gray-600" />
                      <select
                        className="w-full px-4 py-2 bg-white border rounded-md focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Choose Status</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <button
                      className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                      type="submit"
                      disabled={loading || status === ""}
                    >
                      Update Status
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProcessOrder;
