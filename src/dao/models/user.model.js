import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2' 

const { Schema, SchemaTypes } = mongoose;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    orders: [
    {
        type: SchemaTypes.ObjectId,
        ref: "Orders",
    },
    ],
cart: [
    {
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    },
],
});

// Aplica el plugin de paginación
userSchema.plugin(mongoosePaginate)

const userModel = mongoose.model("User", userSchema);

export default userModel;