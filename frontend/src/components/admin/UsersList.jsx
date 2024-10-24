import React, { useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layouts/MetaData';
import Navbar from '../layouts/Navbar';
import SideBar from './SideBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstant';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
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
      alert(message);
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.row.role === 'admin' ? 'text-green-500' : 'text-red-500',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon className="text-blue-500 cursor-pointer hover:text-blue-600 transition" />
            </Link>

            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon className="text-red-500 cursor-pointer hover:text-red-600 transition" />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = users?.map((user) => ({
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name,
  }));

  return (
    <>
      <MetaData title="ALL USERS - Admin" />
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-64 bg-gray-800 text-white">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-4/5 p-6 md:mt-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Users</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <DataGrid
              rows={rows || []}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f0f4f8',
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
