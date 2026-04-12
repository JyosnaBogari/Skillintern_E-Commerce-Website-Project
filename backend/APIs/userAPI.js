import express from 'express';
import { registration } from '../Services/authService.js';
import { UserTypeModel } from '../models/userTypeModel.js';
import { ProductModel } from '../models/productModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

//create mini router
export const userRoute = express.Router();

/**
 * POST /users - Register new user with optional profile image
 * @middleware upload.single("profileImageUrl") - Handles profile image upload
 * @param {Object} req.body - User data (name, email, password, etc.)
 * @param {File} req.file - Optional profile image file
 * @returns {Object} Created user object
 * @throws {Error} If registration or upload fails, performs Cloudinary rollback
 */
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                // Upload profile image to Cloudinary if provided
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Register user with Cloudinary image URL
                const newUserObj = await registration({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Rollback: Delete uploaded image if registration fails
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err);
            }

        }
  );


/**
 * PUT /user-cart/:pid - Add product to user cart or increase quantity
 * @middleware verifyToken("USER") - Requires user authentication
 * @param {string} pid - Product ID from URL params
 * @returns {Object} Updated cart with populated product details
 * @throws {404} If user or product not found
 */
userRoute.put('/user-cart/:pid', verifyToken("USER"), async (req, res) => {
    let uid = req.user.userId;
    let { pid } = req.params;

    // Verify user exists and is active
    let user = await UserTypeModel.findOne({ _id: uid, isActive: true });
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    // Verify product exists and is active
    let product = await ProductModel.findOne({ _id: pid, isActive: true });
    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }

    // Check if product already in cart
    let isProductInCart = user.cart.find(
        item => item.product.toString() === pid
    );

    // If exists → increase quantity, else add new item
    if (isProductInCart) {
        isProductInCart.quantity += 1;
    } else {
        user.cart.push({ product: pid, quantity: 1 })
    }

    // Save updated cart
    await user.save();

    // Return populated cart
    let modifiedUser = await UserTypeModel
        .findOne({ _id: uid })
        .populate("cart.product");

    return res.status(200).json({
        message: "Product quantity updated in cart",
        payload: modifiedUser.cart
    });
})

//read user by id [get only one user]
userRoute.get('/users/:uid', verifyToken("ADMIN"), async (req, res) => {
    let uid = req.params.uid; //{uid}
    let user = await UserTypeModel.findById(uid).populate("cart.product");
    // user check
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    // send res
    res.status(200).json({ message: "user found", payload: user });
})


//get all users 
userRoute.get('/users', verifyToken("ADMIN"), async (req, res) => {
    //find the users in the database
    let user = await UserTypeModel.find();
    // check user in the database
    if (user.length == 0) {
        return res.status(404).json({ message: "No User Found" })
    }
    //return response
    res.status(200).json({ message: "users found", payload: user });

})

//update user profile
userRoute.put('/update-user/:uid', verifyToken("USER"), async (req, res) => {
    //get the user id from the req.params
    let userId = req.params.uid;

    //check if user updating their own profile
    if(req.user.userId !== userId){
        return res.status(403).json({message:"You can update only your profile"});
    }

    //get the user details from the req.body
    let userUpdates = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, value]) => value !== undefined && value !== ""
      )
    );

    let user = await UserTypeModel.findById(userId)

    // user check
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    // check user active 
    if (user.isActive === false) {
        return res.status(403).json({ message: "You are blocked by admin.Please Contact Admin" });
    }

    let updatedUser = await UserTypeModel.findByIdAndUpdate(userId, { $set: userUpdates }, { new: true });

    if (updatedUser) {
      updatedUser.password = undefined
      return res.status(200).json({ message: "User Details updated", payload: updatedUser });
    }

    res.status(500).json({ message: "Unable to update user details" });
})

/**
 * GET /user-cart - Retrieve user's cart items
 * @middleware verifyToken("USER") - Requires user authentication
 * @returns {Object} Array of cart items with populated product details
 * @throws {404} If user not found
 * @throws {403} If user is blocked by admin
 */
userRoute.get('/user-cart',verifyToken("USER"),async(req,res)=>{
    let uid=req.user.userId;
    let user= await UserTypeModel.findOne({_id:uid}).populate("cart.product")
    if(!user)
    {
        return res.status(404).json({message:"user not found"})
    }
    if(user.isActive===false)
    {
        return res.status(403).json({message:"You are blocked by Admin.Please Contact Admin"})
    }
    return res.status(200).json({message:"cart products",payload:user.cart})
})

/**
 * DELETE /remove-cart/:pid - Remove product from user's cart
 * @middleware verifyToken("USER") - Requires user authentication
 * @param {string} pid - Product ID to remove from URL params
 * @returns {Object} Success message
 * @throws {404} If user not found
 * @throws {403} If user is blocked by admin
 */
userRoute.delete('/remove-cart/:pid',verifyToken("USER"),async(req,res)=>{
    let uid=req.user.userId;
    let {pid}=req.params;
    let user= await UserTypeModel.findOne({_id:uid}).populate("cart.product")
     if(!user)
    {
        return res.status(404).json({message:"user not found"})
    }
    if(user.isActive===false)
    {
        return res.status(403).json({message:"You are blocked by Admin.Please Contact Admin"})
    }
    await UserTypeModel.updateOne({_id:uid},{$pull:{cart:{product:pid}}})
    res.status(200).json({message:"product removed from cart"})
})