import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Dashboard, PostAdd, Add, ListAlt, People, RateReview, Menu } from '@mui/icons-material';
import navLogo from '../../assets/images/footerlogo.webp';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button 
        className="fixed top-[12%] right-[6%] md:hidden z-50 bg-gray-900 text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div className={`fixed md:top-20 top-16 left-0 w-64 h-full bg-gray-900 text-white z-40 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex items-center justify-center py-4">
          <Link to="/">
            <img src={navLogo} alt="logo" className="w-24 h-24 object-cover" />
          </Link>
        </div>
        <nav className="mt-4 flex flex-col space-y-2">
          <Link to="/admin/dashboard" className="flex items-center p-4 hover:bg-gray-700 transition">
            <Dashboard className="mr-2" />
            <span>Dashboard</span>
          </Link>

          <div className="p-4 hover:bg-gray-700 transition">
            <SimpleTreeView>
              <TreeItem nodeId="1" label="Products">
                <Link to="/admin/products" className="flex items-center mt-2 pl-4 hover:text-gray-400">
                  <PostAdd className="mr-2" />
                  <span>All Products</span>
                </Link>
                <Link to="/admin/product" className="flex items-center pl-4 mt-2 hover:text-gray-400">
                  <Add className="mr-2" />
                  <span>Create Product</span>
                </Link>
              </TreeItem>
            </SimpleTreeView>
          </div>

          <Link to="/admin/orders" className="flex items-center p-4 hover:bg-gray-700 transition">
            <ListAlt className="mr-2" />
            <span>Orders</span>
          </Link>
          <Link to="/admin/users" className="flex items-center p-4 hover:bg-gray-700 transition">
            <People className="mr-2" />
            <span>Users</span>
          </Link>
          <Link to="/admin/reviews" className="flex items-center p-4 hover:bg-gray-700 transition">
            <RateReview className="mr-2" />
            <span>Reviews</span>
          </Link>
        </nav>
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default SideBar;
