import mongoose from "mongoose";

export const connection = async () => {
try {
    const conn = await mongoose.connect(
    "mongodb://localhost:3030/e-commerce-2"
    );
    if (conn) console.log("conexion establecida");
} catch (error) {
    console.log(error);
}
};