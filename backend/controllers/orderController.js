const orderModel = require("../models/orderModel")
const asyncHandler = require("../middleware/catchAsyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const productModel = require("../models/productModel")


//create new order
const newOrder = asyncHandler(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    if(!orderItems || !orderItems.length === 0){
        return next(new ErrorHandler("No order items found",400))
    }

    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        order
    })
})

//get single order
const getSingleOrder = asyncHandler(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

//get logged in user orders
const myOrders = asyncHandler(async(req,res,next)=>{
    const orders = await orderModel.find({user: req.user._id})

    if(!orders){
        return next(new ErrorHandler("No orders found",404))
    }
    res.status(200).json({
        success: true,
        orders
    })
})  

//get all orders -- admin
const getAllOrders = asyncHandler(async(req,res,next)=>{
    const orders = await orderModel.find()
    let totalAmount = 0
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })
    
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//update order -- admin
const updateOrder = asyncHandler(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order already delivered",400))
    }
    
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async item=>{
            await updateStock(item.product,item.quantity)
        })
    }

    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id,quantity) {
    const product = await productModel.findById(id)

     // Prevent stock from becoming negative
     if (product.stock - quantity < 0) {
        product.stock = 0;
    } else {
        product.stock -= quantity;
    }

    await product.save({validateBeforeSave:false})

}


//delete order -- admin
const deleteOrder = asyncHandler(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

    await order.deleteOne()

    res.status(200).json({
        success: true,  
        message: "Order deleted successfully"
    })
})



module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
};