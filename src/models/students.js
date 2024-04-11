import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;






const studentCollection = "students";
const  studentSchema = mongoose.Schema({ 

    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: String,
    group: Number,
    courses: {
        type:Array,
        default: []
    }
})
studentSchema.plugin(mongoosePaginate);
const studentsModel = mongoose.model(studentCollection, studentSchema);

export default studentsModel;