const {Router} = require("express")
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductDetails, createProductReview, getProductReviews, deleteReviews, getAdminProducts } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const router = Router()

router.get("/products" , getAllProducts)
router.get("/product/:id" , getProductDetails)

// Admin routes for products
router.get("/admin/products" ,isAuthenticatedUser, authorizeRoles("admin") , getAdminProducts)
router.post("/admin/product/new" ,isAuthenticatedUser, authorizeRoles("admin") , createProduct)
router.put("/admin/product/:id" ,isAuthenticatedUser,authorizeRoles("admin") , updateProduct)
router.delete("/admin/product/:id" ,isAuthenticatedUser,authorizeRoles("admin") , deleteProduct)
router.put("/review" ,isAuthenticatedUser, createProductReview)
router.get("/reviews" , getProductReviews)
router.delete("/reviews" ,isAuthenticatedUser, deleteReviews)

module.exports = router