import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts, clearErrors , deleteProduct } from '../../actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from '../layouts/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import Loader from '../layouts/Loader';
import Navbar from '../layouts/Navbar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const {isDeleted , error:deleteError} = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
       dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
   
        if(deleteError) {
          alert(deleteError);
          dispatch(clearErrors());
        }
 
        if(isDeleted) {
            alert("Product deleted successfully");
            navigate('/admin/dashboard');
            dispatch({type: DELETE_PRODUCT_RESET});
        }
         

        dispatch(getAdminProducts());
    }, [dispatch, error , deleteError, isDeleted ,navigate]);

    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
        { field: 'name', headerName: 'Name', minWidth: 350, flex: 1 },
        { field: 'stock', headerName: 'Stock', type: 'number', minWidth: 150, flex: 0.3 },
        { field: 'price', headerName: 'Price', type: 'number', minWidth: 270, flex: 0.5 },
        {
            field: 'actions', headerName: 'Actions', sortable: false, minWidth: 150, renderCell: (params) => {
                return (
                    <div className="flex space-x-2">
                        <Link to={`/admin/product/${params.row.id}`}>
                            <EditIcon className="text-blue-500 hover:text-blue-700" />
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.row.id)} className="text-red-500 hover:text-red-700">
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            }
        },
    ];

    const rows = products ? products.map((item) => ({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
    })) : [];

    return (
        <>
            <MetaData title="All Products - Admin" />
            <Navbar/>
            {loading ? (
                <Loader />
            ) : (
              <div className="flex flex-col md:flex-row min-h-screen">
    {/* Sidebar */}
    <div className="w-full md:w-64 bg-gray-200 md:border-r md:border-gray-300">
        <SideBar />
    </div>

    {/* Main Content */}
    <div className="flex-grow p-4 md:p-6 bg-gray-100  md:mt-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">ALL PRODUCTS</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
            </div>
        </div>
    </div>
</div>

          
            )}
        </>
    );
}

export default ProductList;
