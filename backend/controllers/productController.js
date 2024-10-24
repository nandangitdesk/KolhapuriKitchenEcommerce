const asyncHandler = require("../middleware/catchAsyncHandler");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;


//create product route --- ("Admin")
const createProduct = asyncHandler(async (req, res, next) => {
  
  let images = [];
  if(typeof req.body.images === "string"){
      images.push(req.body.images);
  }else{
    images = req.body.images
  }

  const imagesLink =[];
  for(let i=0;i<images.length;i++){
    const result = await cloudinary.uploader.upload(images[i],{
      folder:"products",

    });
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url,

    });
  }

  req.body.images = imagesLink;

  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//update product route --- {"admin"}
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);

  if (!product) {
    return new ErrorHandler("Product not found", 404);
  }
  
  //update images if provided
  let images = [];
  if(typeof req.body.images === "string"){
      images.push(req.body.images);
  }else{
    images = req.body.images
  }

  if (images !== undefined) {
      //delete images from cloudinary
  for(let i=0;i<product.images.length;i++){
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
   

  const imagesLink =[];
  for(let i=0;i<images.length;i++){
    const result = await cloudinary.uploader.upload(images[i],{
      folder:"products",

    });
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url,

    });
  }

  req.body.images = imagesLink;

  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product --- ("Admin")
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  
  //delete images from cloudinary
  for(let i=0;i<product.images.length;i++){
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }


  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product delete successfully",
  });
});


//Get all product
const getAllProducts = asyncHandler(async (req, res) => {
  const resultPerPage = 25;
  const productsCount = await productModel.countDocuments();

  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query.clone(); // Use .clone() here
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query.clone(); // Use .clone() here as well

  res.status(200).json({     
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount
  });
});

// Get single product
const getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//create new review and update
const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user._id.toString()
  );
  

  // If reviewed, update the review
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating; // Update rating
        rev.comment = comment; // Update comment
      }
    });
  } else {
    // Otherwise, add a new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length; // Update number of reviews
  }

  // Calculate the total rating and update the product rating
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  product.ratings = totalRating / product.reviews.length;


  //save the product and update the reviews
  await product.save({ validateBeforeSave: false });
  

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

//get all reviews of a product
const getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//delete reviews
const deleteReviews = asyncHandler(async(req,res,next)=>{
  const product = await productModel.findById(req.query.productId);  

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())
  
 //ab filter ke baad naye reviews ayeenge to use ke liye ye sab🔽
  
  let totalRating = 0;
  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  const ratings = reviews.length === 0 ? 0 : totalRating / reviews.length;
  
  const numOfReviews = reviews.length

  await productModel.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },
  {
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success: true,
  });
})


//Get all product ( ADMIN )
const getAdminProducts = asyncHandler(async (req, res) => {

  const products = await productModel.find();
 
  res.status(200).json({     
    success: true,
    products,
    
  });
});


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getAdminProducts, 
};
