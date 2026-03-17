import exp from "express";
import { UserTypeModel } from '../models/userTypeModel.js';
import { verifyToken } from "../middlewares/verifyToken.js";
import { OrderModel } from "../models/orderModel.js";
import { ProductModel } from "../models/productModel.js";
export const adminRoute = exp.Router();


//Block user
adminRoute.put('/blockuser', verifyToken("ADMIN"), async (req, res) => {
  // find the user is there in db or not
  let { userId } = req.body; //here we can take from params url patha also 
  console.log(userId);
  //find user and check the user available or not
  let user = await UserTypeModel.findById(userId); //
  if (!user) {
    return res.status(404).json({ message: "user is not existed/found" });
  }
  //update the user isActive false
  let blockedUser = await UserTypeModel.findByIdAndUpdate(userId, { $set: { isActive: false } }, { new: true })
  //send res
  res.status(200).json({
    message: "user blocked successfully",
    payload: blockedUser
  })
})


//Unblock user
adminRoute.put('/unblockuser', verifyToken("ADMIN"), async (req, res) => {
  // find the user is there in db or not
  let { userId } = req.body;
  //find user and check the user available or not
  let user = await UserTypeModel.findById(userId); //
  if (!user) {
    return res.status(404).json({ message: "user is not existed/found" });
  }
  //update the user isActive false
  let blockedUser = await UserTypeModel.findByIdAndUpdate(userId, { $set: { isActive: true } }, { new: true })
  //send res
  res.status(200).json({
    message: "user unblocked successfully",
    payload: blockedUser
  })
})

//admin can view all the ordered products 
adminRoute.get('/orders', verifyToken("ADMIN"), async (req, res) => {
  let products = await OrderModel.find().populate("user").populate("products.product")
  if (!products) {
    return res.json({ message: "no products are places" })
  }
  res.json({ message: "ordered products", payload: products })
})


//delete one product
adminRoute.delete('/product-id/:pid', verifyToken("ADMIN"), async (req, res) => {
    //get the product id from the req.params
    let { pid } = req.params;
    // check the product
    let product = await ProductModel.findOne({ _id: pid, isActive: true })
    // if product not there
    if (!product) {
        return res.status(404).json({ message: "products are inActive" })
    }
    // delete product
    let deleteProduct = await ProductModel.findByIdAndUpdate(pid, { isActive: false }, { new: true })
    // send res
    res.status(200).json({ message: "product deleted", payload: deleteProduct })
})