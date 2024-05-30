import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "product";

const productSchema = new Schema({
name: {
    type: String,
    required: true,
},
description: {
    type: String,
    required: true,
},
category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "category", 
    required: true, 
},
price: {
    type: Number,
},
brand: {
    type: String,
},
model: {
    type: String,
},
colors: {
    type: [String],
},
sizes: {
    type: [String], 
},
images: [
    {
    color: {
    type: String, 
    },
    url: {
        type: String, 
    },
    },
],
});

 //populate y paginate
productSchema.plugin(mongoosePaginate)

export default mongoose.model(collection, productSchema);