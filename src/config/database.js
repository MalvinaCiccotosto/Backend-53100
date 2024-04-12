import mongoose from "mongoose";


const connectMongoDB = async () => {
    const DB_URL = "mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority"
    
    try{
    await mongoose.connect(DB_URL)      
    }catch(error){
        console.error("No se pudo conectar a la DB", error)
        process.exit()
    }
    }
    
    connectMongoDB()

    const environment = async () => { 
        const DB_URL = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority'
        await mongoose.conect(DB_URL)
        console.log("Conectado a MongoDB!!!");
    
    
        const PATH = "./src/data/data.json"
    
        fs.readFile(PATH, "utf-8", (err, data) =>{
    
            if(err){
                console.error("Error reading data")
                return 
            }
            
            const user = JSON.parse(data)
    
            userModel.insertMany(users)
            .then(() => console.log("Data inserted!!"))
            .catch(err => console.log(err))
            })
    
    
            let result = await userModel.insertMany({first_name: "Carolina", last_name: "Contreras", email: "caro@gmail.com", gender: "Female", courses: ["65fa2577f6ebc114415c8e51"]})
    console.log(result)

    const pipeline = [
        {
            $match: { size: "medium"},
        },
        {
            $group:{
                _id:"$name", 
                total:{$sum: "$quantity"},
            },
        },
        {
            $sort: {total: 1},
        },
    ];

    // const orders = await OrderModel.aggregate(pipeline)
    // console.log(orders)
const users= await usersModel.paginate({gender:"Femenino"},{limit:2,page:1})
console.log(users)

};

environment()