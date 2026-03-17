import { Schema, model } from 'mongoose';

//product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "product Name is required"]
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "product price is required"]
    },
    stock: {
        type: Number,
        default: 1
    },
    image: {
        type: String,
        required: [true, "product image is required"]
    },
    category: {
        type: String,
        required: [true, "product category is required"]
    },
    brand: {
        type: String,
        required: [true, "product brand is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
},
    {
        strict: "throw",
        timestamps: true,
        versionKey: false
    })
//create model
export const ProductModel = model("product", productSchema);