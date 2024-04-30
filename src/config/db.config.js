import mongoose from "mongoose";

//settings
const DB_URL =
process.env.DB_URL ||
"mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority";

const dbConnection = async () => {
try {
    await mongoose.connect(DB_URL);
    console.log(`Database is connected!`);
} catch (error) {
    console.log(`Error: ${error}`);
}
};

export default dbConnection;