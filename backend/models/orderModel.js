import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ["PLACED", "SHIPPED", "DELIVERED"],
        default: "PLACED"
    }
}, { timestamps: true });

export const OrderModel = model("order", orderSchema);