import exp from 'express';
import { ProductModel } from '../models/productModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const productRoute = exp.Router()

//post the products
productRoute.post('/products', verifyToken("ADMIN"), async (req, res) => {

    //get the product details from the req.body
    let newProduct = req.body;
    //checking the product details
    let newProductDoc = new ProductModel(newProduct)
    //save in database
    await newProductDoc.save();
    //send res
    res.status(201).json({ message: "product created", payload: newProductDoc })

})

//get all the products
productRoute.get('/products', async (req, res) => {
    //check the product
    let productList = await ProductModel.find({ isActive: true })
    if (productList.length == 0) {
        return res.status(404).json({ message: "products are not available" })
    }
    //send res
    res.status(200).json({ message: "products", payload: productList })
})

//get only one product
productRoute.get('/product-id/:pid', async (req, res) => {
    //get the product id from the req.params
    let { pid } = req.params;
    //check the product
    let singleProduct = await ProductModel.findOne({ _id: pid, isActive: true })
    // if product not there
    if (!singleProduct) {
        return res.status(404).json({ message: "products are not available" })
    }
    // send res
    res.status(200).json({ message: "One product", payload: singleProduct })
})

//update the product
productRoute.put('/update-product/:pid', verifyToken("ADMIN"), async (req, res) => {
    //get the user id from the req.params
    let { pid } = req.params;
    //get the user details from the req.body
    let productUpdates = req.body;
    // console.log(productUpdates)
    let isProductAvailable = await ProductModel.findById(pid)
    // if product not available
    if (!isProductAvailable || isProductAvailable.isActive === false) {
        return res.status(404).json({ message: "product not found" });
    }
    // update the product
    let updatedProduct = await ProductModel.findByIdAndUpdate(pid, { $set: productUpdates }, { new: true });
    // send res
    res.status(200).json({ message: "product by id", payload: updatedProduct });
})



//Filter By category
productRoute.get('/filter-category/:category', async (req, res) => {
    //get the category by the body
    let { category } = req.params;
    // check product
    let products = await ProductModel.find({ category: category, isActive: true })
    // product not there
    if (products.length == 0) {
        return res.status(404).json({ message: "products is inActive Please contact Admin" })
    }
    // send res
    res.status(200).json({ message: "product filteref by category", payload: products })
})
