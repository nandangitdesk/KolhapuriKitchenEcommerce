import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import Faq from './components/Faq';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import RefundPolicy from './components/RefundPolicy';
import ShippingPolicy from './components/ShippingPolicy';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import About from './components/About';
import LoginSignUp from './components/LoginSignUp';
import { loadUser } from './actions/userAction';
import store from './store/store';
import UserOptions from './components/UserOptions';
import Profile from './components/layouts/Profile';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/Route/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import ConfirmOrder from './components/ConfirmOrder';
import ProcessPayment from './components/ProcessPayment';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import OrderSuccess from './components/layouts/OrderSuccess';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import EditProcessOrder from './components/admin/EditProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import Contact from './components/Contact';



const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
        {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path = "/order/success" element={<OrderSuccess/>} />
    
        <Route path="/payment/success" element={<PaymentSuccess/>}/>
        <Route path="payment/failure" element={<PaymentFailure/>} />
        <Route path="/contact" element={<Contact/>} />


        {/* Protected Route */}
        <Route 
          path="/account" 
          element={<ProtectedRoute component={Profile} />} 
        />
        <Route path="/me/update" element={<ProtectedRoute component={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute component={UpdatePassword} />} />
        <Route path="/login/shipping"  element={<ProtectedRoute component={Shipping} />} />
        <Route path="/order/confirm"  element={<ProtectedRoute component={ConfirmOrder} />} />
        <Route path="/process/payment"  element={<ProtectedRoute component={ProcessPayment} />} />
        <Route path="/orders"  element={<ProtectedRoute component={MyOrders} />} />
        <Route path="/order/:id"  element={<ProtectedRoute component={OrderDetails} />} />
        <Route isAdmin={true} path="/admin/dashboard"  element={<ProtectedRoute component={Dashboard} />} />
        <Route isAdmin={true} path="/admin/products"  element={<ProtectedRoute component={ProductList} />} />
        <Route isAdmin={true} path="/admin/product"  element={<ProtectedRoute component={NewProduct} />} />
        <Route isAdmin={true} path="/admin/product/:id"  element={<ProtectedRoute component={UpdateProduct} />} />
        <Route isAdmin={true} path="/admin/orders"  element={<ProtectedRoute component={OrderList} />} />
        <Route isAdmin={true} path="/admin/order/:id"  element={<ProtectedRoute component={EditProcessOrder} />} />
        <Route isAdmin={true} path="/admin/users"  element={<ProtectedRoute component={UsersList} />} />
        <Route isAdmin={true} path="/admin/user/:id"  element={<ProtectedRoute component={UpdateUser} />} />
        <Route isAdmin={true} path="/admin/reviews"  element={<ProtectedRoute component={ProductReviews} />} />


        
        
      </Routes>
    </div>
  );
};

export default App;