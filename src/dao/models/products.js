import mongoose from "mongoose";
const { Schema } = mongoose

const collection = "Products"


// const schema = new Schema({

//     title: {
//         type: String,
//         require: true
//     },
//     description: {
//         type: String,
//         require: true
//     },
//     code: {
//         type: String,
//         require: true
//     },
//     category: {
//         type: String,
//         require: true
//     },
//     brand: {
//         type: String,
//         require: true
//     },
//     price: {
//         type: Number,
//         require: true
//     },
//     stock: {
//         type: Number,
//         require: true
//     },
//     status: {
//         type: Boolean,
//         require: true
//     },
//     thumbnails: {
//         type: [String],
//         require: true
//     }

    //title
    //price
    //description
    //thumbnails
    //code
    //stock
    //status
    //category
    //brand


//})

const schema = new Schema({
    first_name: {
        type: String,
        require: true,
        index: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "courses" }]
})



const productsModel = mongoose.model(collection, schema)

export default productsModel