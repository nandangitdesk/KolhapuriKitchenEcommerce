import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, productsReducer, productReviewsReducer, reviewReducer } from "../reducers/productReducer";
import { userReducer, profileReducer , forgotPasswordReducer, allUsersReducer, userDetailsReducer} from "../reducers/userReducer";
import {cartReducer } from '../reducers/cartReducer';
import { newOrderReducer , myOrdersReducer , orderDetailsReducer, allOrdersReducer, orderReducer } from '../reducers/orderReducer';

let initialState ={
    cart:{
        cartItems : localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo:localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
        
    }
}

const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        profile: profileReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        newReview:newReviewReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        newProduct: newProductReducer,
        product: productReducer,
        allOrders: allOrdersReducer,
        order: orderReducer,
        allUsers:allUsersReducer,
        userDetails: userDetailsReducer, 
        productReviews: productReviewsReducer, 
        review: reviewReducer, 
        

    },
    preloadedState: initialState,

});


export default store;