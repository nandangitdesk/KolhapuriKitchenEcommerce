import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../actions/orderAction';
import { Link } from 'react-router-dom';
import Loader from './layouts/Loader';
import Typography from '@mui/material/Typography';
import MetaData from './layouts/MetaData';
import { Launch } from '@mui/icons-material';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <span className={`font-bold ${params.value === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>
          {params.value}
        </span>
      ),
    },
    { field: 'itemsQuantity', headerName: 'Items Qty', width: 150, flex: 0.3 },
    { field: 'amount', headerName: 'Amount', width: 270, flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <Launch className='text-red-500 hover:text-red-700 transition-colors duration-200' />
        </Link>
      ),
    },
  ];

  const rows = orders ? orders.map((item) => ({
    itemsQuantity: item.orderItems.length,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
  })) : [];

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        
        <div className="myOrdersPage p-6 ">
          <Typography variant="h4" className="mb-4 font-semibold text-gray-800 text-center">{user.name}'s Orders</Typography>
          <div className="overflow-x-auto shadow-md rounded-lg mt-10">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
              rowHeight={60}
              getRowClassName={() => 'hover:bg-gray-100 transition duration-200'}
            />
          </div>
          <div className="mt-4">
            <Typography variant="body1" className="text-gray-600 text-center">
              Manage your orders efficiently.
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
