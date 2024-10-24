import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Navbar from '../layouts/Navbar';
import MetaData from '../layouts/MetaData';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const dispatch = useDispatch();
  const { products=[] } = useSelector((state) => state.products);
  const {orders} = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);


   let outOfStock = 0;
   products && products.forEach((item) => {
         if (item.stock === 0) {
            outOfStock+= 1;
         }
   });

   useEffect(() => {
   
    dispatch(getAdminProducts());
    dispatch(getAllOrders())
    dispatch(getAllUsers())
}, [dispatch]);

   let totalAmount = 0;
  orders && orders.forEach(order=>{
        totalAmount += order.totalPrice
   })


  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)'],
        data: [outOfStock, products.length - outOfStock],
      }
    ],
  };

  return (
    <div>
      <MetaData title="Dashboard" />
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <SideBar />

        {/* Dashboard content */}
        <div className="md:ml-64 w-full min-h-screen md:mt-20 p-4 md:p-8 bg-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>
          <div className="dashboardSummary bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <p className="text-lg font-semibold">Total Amount</p>
              <p className="text-xl md:text-2xl font-bold">₹ {totalAmount}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <Link
                to='/admin/products'
                className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition"
              >
                <p className="text-base md:text-lg font-semibold">Products</p>
                <p className="text-xl md:text-2xl">{products && products.length}</p>
              </Link>
              <Link
                to='/admin/orders'
                className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition"
              >
                <p className="text-base md:text-lg font-semibold">Orders</p>
                <p className="text-xl md:text-2xl">{orders && orders.length}</p>
              </Link>
              <Link
                to='/admin/users'
                className="bg-purple-500 text-white p-4 rounded-lg shadow hover:bg-purple-600 transition"
              >
                <p className="text-base md:text-lg font-semibold">Users</p>
                <p className="text-xl md:text-2xl">{users && users.length}</p>
              </Link>
            </div>
          </div>

          {/* Line Chart */}
          <div className="lineChart w-full md:w-[80%] mx-auto mt-10">
            <Line
              data={lineState}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    type: 'category',
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Doughnut Chart */}
          <div className="doughnutChart w-full md:w-[80%] mx-auto mt-10">
            <div className=" p-4 ">
              <h2 className="text-lg font-semibold mb-4">Stock Overview</h2>
              <div className="w-full h-72">
                <Line
                  data={doughnutState}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
