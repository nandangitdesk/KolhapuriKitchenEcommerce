const {Router} = require("express")
const { registerUser, loginUser, logoutUser, getUserDetails, getAllUsers, getSingleUser, updatePassword, updateProfile, updateUserRole, deleteUser, forgotPassword, resetPassword } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = Router()

router.post("/register" , registerUser)
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/password/forgot" , forgotPassword)
router.put("/password/reset/:token" , resetPassword)

router.get("/me",isAuthenticatedUser,getUserDetails)

router.put("/password/update" ,isAuthenticatedUser, updatePassword)
router.put("/me/update" ,isAuthenticatedUser, updateProfile)

router.get("/admin/users" ,isAuthenticatedUser , authorizeRoles("admin"), getAllUsers)

router.get("/admin/user/:id" , isAuthenticatedUser , authorizeRoles("admin") , getSingleUser)
router.put("/admin/user/:id" , isAuthenticatedUser , authorizeRoles("admin") , updateUserRole)
router.delete("/admin/user/:id" , isAuthenticatedUser , authorizeRoles("admin") , deleteUser)




module.exports = router