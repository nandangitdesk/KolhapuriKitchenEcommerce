import React, { useEffect, useState, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllReviews, deleteReviews } from '../../actions/productAction';
import SideBar from './SideBar';
import MetaData from '../layouts/MetaData';
import { Delete } from '@mui/icons-material';
import { Star } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DELETE_REVIEW_RESET } from '../../constants/productConstant';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

const ProductReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector((state) => state.productReviews);
  const [productId, setProductId] = useState('');

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert('Review Deleted Successfully');
      navigate('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId, navigate]);

  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },
    { field: 'user', headerName: 'User', minWidth: 200, flex: 0.6 },
    { field: 'comment', headerName: 'Comment', minWidth: 350, flex: 1 },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) =>
        params.row.rating >= 3 ? 'greenColor' : 'redColor',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  if (reviews && reviews.length > 0) {
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  }

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Section */}
        <div className="hidden lg:block lg:w-64 bg-gray-800 min-h-screen">
          <SideBar />
        </div>

        {/* Review Section */}
        <div className="w-full lg:w-[85%] p-4 lg:p-8 md:mt-20 mt-[4rem]">
          <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6">
            <form className="bg-white p-4 lg:p-6 rounded-lg shadow-md" onSubmit={productReviewsSubmitHandler}>
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 lg:mb-6 text-center">
                ALL REVIEWS
              </h1>

              <div className="flex items-center border border-gray-300 rounded-lg p-2 lg:p-3 mb-4 lg:mb-6">
                <Star className="text-yellow-500" />
                <input
                  type="text"
                  placeholder="Product ID"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full ml-3 p-2 lg:p-3 border-none outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 lg:py-3 rounded transition duration-300"
                disabled={loading || productId === ''}
              >
                Search
              </Button>
            </form>

            {/* Reviews List */}
            {loading ? (
              <p className="text-center text-gray-500 mt-6">Loading reviews...</p>
            ) : reviews && reviews.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable bg-white shadow-lg rounded-lg p-4 lg:p-6"
                  autoHeight
                />
              </div>
            ) : (
              <h1 className="text-lg lg:text-xl font-semibold text-center text-gray-500 mt-6">
                No Reviews Found
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
