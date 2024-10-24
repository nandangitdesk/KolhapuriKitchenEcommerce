const asyncHandler = require("../middleware/catchAsyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const userModel = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")
const cloudinary = require("cloudinary").v2;



//create user 
const registerUser = asyncHandler( async (req , res , next)=>{

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const {name , email , password} = req.body
    const user = await userModel.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
    })

    sendToken(user , 201 , res)
})





//login user
const loginUser = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body

    if (!email || !password ) {
        return next(new ErrorHandler("Please enter email or password",400))
    }

    const user = await userModel.findOne({email}).select("+password")

    if (!user) {
       return next(new ErrorHandler("Invalid user or password",401)) 
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password",401))
    }

    sendToken(user , 200 , res)
})





//logout user
const logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  });





  //get user details /me
const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });




  //update password
const updatePassword = asyncHandler(async(req,res,next)=>{
   const user = await userModel.findById(req.user.id).select("+password")
   
   const isPasswordMatch = await user.comparePassword(req.body.oldPassword)
   
   if (!isPasswordMatch) {
     return next(new ErrorHandler("Old password is incorrect",400))
   }

   if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(200, user , res);
    
});

//update profile
const updateProfile = asyncHandler(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }

     if (req.body.avatar !== "") {
        const user = await userModel.findById(req.user.id);
        
        if (user.avatar && user.avatar.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }
       
        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }
    

    const user = await userModel.findByIdAndUpdate(req.user.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
    
})






  //get all Users ("Admin")
const getAllUsers = asyncHandler(async(req,res,next)=>{
    const users = await userModel.find()
    
    res.status(200).json({
      success:true,
      users
    })
  })
  
  //get any single user details ("Admin")
  const getSingleUser = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id)
  
    if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,404))
    }
  
    res.status(200).json({
      success:true,
      user
    })
  })

  //update user role ("Admin")
  const updateUserRole = asyncHandler(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await userModel.findByIdAndUpdate(req.params.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        message:"User role updated successfully"
    })

  })

  //delete user ("Admin")
  const deleteUser = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id)
    
    

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,404))
    }
   
    const imageId = user.avatar.public_id
    await cloudinary.uploader.destroy(imageId);

    
    await user.deleteOne()

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
  })

  //forgot password 
  const forgotPassword = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findOne({email:req.body.email})

    if (!user) {
        return next(new ErrorHandler("User not found",404))
    }
    
    //get reset password token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is as follows:\n\n${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it.` 

    try {
        await sendEmail({
          email:user.email ,
          subject : "Password Recovery",
          message,
        })

        res.status(200).json({
            success:true,
            message:`Password reset email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message , 500))
    }
    
  })  

  //reset password
  const resetPassword = asyncHandler(async(req,res,next)=>{
    //hashing token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired",400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user , 200 , res)
  })  

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
    getAllUsers,
    getSingleUser,
    updatePassword,
    updateProfile,
    updateUserRole,
    deleteUser,
    forgotPassword,
    resetPassword
}