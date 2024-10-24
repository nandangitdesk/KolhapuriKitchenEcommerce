import React, { useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllOrders, deleteOrder, clearErrors } from '../../actions/orderAction';
import SideBar from './SideBar';
import MetaData from '../layouts/MetaData';
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import Navbar from '../layouts/Navbar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const OrderList = () => {
  const dispatch = useDispatch();
  const { error, orders = [] } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert('Order Deleted Successfully');
      navigate('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 110,
      flex: 0.5,
      renderCell: (params) => (
        <span
          className={`font-medium ${
            params.row.status === 'Delivered' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 130,
      flex: 0.5,
      renderCell: (params) => (
        <span className="font-medium">₹{params.row.amount}</span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <Link to={`/admin/order/${params.row.id}`}>
            <Edit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
          </Link>
          <Button onClick={() => deleteOrderHandler(params.row.id)}>
            <Delete className="text-red-500 hover:text-red-700" />
          </Button>
        </div>
      ),
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
    status: item.orderStatus,
  }));

  return (
    <>
      <MetaData title="All Orders - Admin" />
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-100 md:mt-20 mt-[4rem] " >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h1>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="w-full">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                className="orderListTable"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
