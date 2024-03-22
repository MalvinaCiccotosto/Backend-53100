import mongoose from 'mongoose';
const { Schema } = mongoose;






const collection = "Estudiantes"

const  schema = new Schema({ 

    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    edad:{
        type: Number,
        require: true
    },
    dni:{
        type: String,
        unique: true
    },
    curso:{
        type: Number,
        require: true
    },
    nota:{
        type: String,
        require: true
    }
})



const studentsModel = mongoose.model(collection, Schema)

export default studentsModel