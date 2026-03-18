import exp from 'express';
import {UserTypeModel} from '../models/userTypeModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
import { OrderModel } from '../models/orderModel.js';
export const OrderRoute=exp.Router()

//place order

OrderRoute.post('/place-order',verifyToken("USER"),async(req,res)=>{
 // take the user id from the req.params
// console.log("req user",req.user);

let uid=req.user.userId;
//Take cart from user
let user=await UserTypeModel.findOne({_id:uid,isActive:true}).populate("cart.product")
if(!user)
{
    return res.json({message:"user not found"})
}
if(user.cart.length==0)
{
    return res.json({message:"No products available in cart.Please add Product"})
}
//Calculate total 
let totalAmount=user.cart.reduce((acc,item)=>acc+item.product.price*item.quantity,0)
//create products array
let products=user.cart.map(item=>({
    product:item.product._id,
    quantity:item.quantity,
    price:item.product.price
}))
//Create order
let order= new OrderModel({
  user:uid,
  products:products,
  totalAmount:totalAmount
})

//save in db
await order.save()

//Reduce stock

for(let item of user.cart){
   item.product.stock -= item.quantity;
   await item.product.save();
}

//Clear cart
user.cart=[]
await user.save();

res.json({message:"order placed",payload:order})
})


