import exp from 'express';
import { registration } from '../Services/authService.js';
import { UserTypeModel } from '../models/userTypeModel.js';
import { ProductModel } from '../models/productModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';

//create mini router
export const userRoute = exp.Router();

//Register user
userRoute.post('/users', async (req, res) => {
    //get the user details from the req.body
    let userObj = req.body;
    // assign role
    const newUserObj = await registration({ ...userObj, role: "USER" });
    // send res
    res.status(201).json({ message: "user created succesfully", payload: newUserObj });
})


//check the product is there in user or not
userRoute.put('/user-cart/:pid', verifyToken("USER"), async (req, res) => {
    let uid = req.user.userId;
    //read the url
    let { pid } = req.params;
    //check the user
    let user = await UserTypeModel.findOne({ _id: uid, isActive: true });
    // if user not there
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    // product check
    let product = await ProductModel.findOne({ _id: pid, isActive: true });
    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }

    // check if product already in cart
    let isProductInCart = user.cart.find(
        item => item.product.toString() === pid  //converts the objectID to string : ObjectId('69806a28c7c118262ebe28d2') to '69806a28c7c118262ebe28d2'
    );
    //o/p: 
    //  {product: new ObjectId('69806a28c7c118262ebe28d2'),
    //_id: new ObjectId('69819496673b876001586f55'),
    // quantity: 3 }

    // if exists → increase quantity
    if (isProductInCart) {
        isProductInCart.quantity += 1;
    } else {
        user.cart.push({ product: pid, quantity: 1 })
    }
    //    save db
    await user.save();

    let modifiedUser = await UserTypeModel
        .findOne({ _id: uid })
        .populate("cart.product");
    // send res
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
    let userUpdates = req.body;

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

    updatedUser.password = undefined

    res.status(200).json({ message: "User Details updated", payload: updatedUser });
})

//to view cart
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

//to remove an item from cart 
userRoute.delete('/remove-cart/:pid',verifyToken("USER"),async(req,res)=>{
    let uid=req.user.userId;
    let {pid}=req.params;
    console.log(pid);
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