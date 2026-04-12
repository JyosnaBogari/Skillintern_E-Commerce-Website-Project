import express from 'express';
import { ProductModel } from '../models/productModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const productRoute = express.Router()

/**
 * POST /products - Create new product with image upload
 * @middleware verifyToken("ADMIN") - Requires admin authentication
 * @middleware upload.single("image") - Handles single file upload from FormData
 * @param {Object} req.body - Product data (name, price, description, category, stock)
 * @param {File} req.file - Image file from FormData field "image"
 * @returns {Object} Created product with Cloudinary image URL
 * @throws {Error} If upload or save fails, performs Cloudinary rollback
 */
productRoute.post("/products",
  verifyToken("ADMIN"),
  upload.single("image"),
  async (req, res, next) => {
    let cloudinaryResult;
    try {
      // Upload image to Cloudinary if provided
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      // Create product with Cloudinary URL
      let newProduct = new ProductModel({
        ...req.body,
        image: cloudinaryResult?.secure_url
      });

      // Save to database
      await newProduct.save();
      res.status(201).json({ message: "product created", payload: newProduct });
    } catch (err) {
      // Rollback: Delete uploaded image if DB save fails
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }
      next(err);
    }
  }
);

/**
 * GET /products - Retrieve all active products
 * @returns {Object} Array of active products
 * @throws {404} If no products are available
 */
productRoute.get('/products', async (req, res) => {
    let productList = await ProductModel.find({ isActive: true })
    if (productList.length == 0) {
        return res.status(404).json({ message: "products are not available" })
    }
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

// PUT: Update product (with optional image update)
// If new image provided: upload to Cloudinary, update DB, then delete old image
// If no image provided: update other fields only
// If DB update fails: delete the newly uploaded image from Cloudinary (rollback)
productRoute.put(
  '/update-product/:pid',
  verifyToken("ADMIN"),
  upload.single("image"), // Middleware allows optional image file with name "image"
  async (req, res, next) => {

    let { pid } = req.params;
    let productUpdates = req.body;
    let cloudinaryResult;
    let oldImagePublicId;

    try {
      let existingProduct = await ProductModel.findById(pid);

      if (!existingProduct || existingProduct.isActive === false) {
        return res.status(404).json({ message: "product not found" });
      }

      if (req.file) {
        // upload new image first
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);

        // save the old image public_id so we can delete only after DB update succeeds
        if (existingProduct.image) {
          const imageUrl = existingProduct.image;
          const imageName = imageUrl.substring(imageUrl.lastIndexOf('/products/') + 10).split('.')[0];
          oldImagePublicId = `products/${imageName}`;
        }

        productUpdates.image = cloudinaryResult.secure_url;
      }

      let updatedProduct = await ProductModel.findByIdAndUpdate(
        pid,
        { $set: productUpdates },
        { new: true }
      );

      if (oldImagePublicId && cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(oldImagePublicId);
      }

      res.status(200).json({
        message: "product updated",
        payload: updatedProduct
      });

    } catch (err) {
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err);
    }
  }
);



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
