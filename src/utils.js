import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt' 
import {fakerDE as faker } from "@faker-js/faker";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash=(password)=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// export const isValidPassword= (user, password)=> bcrypt.compareSync(password, user.password)
export const isValidPassword = (user, password) => {
console.log(
    `Datos a validar: user-password: ${user.password}, password: ${password}`
);
return bcrypt.compareSync(password, user.password);
};

export const generateUser = () => {
    let numOfProducts = parseInt(faker.string.numeric());
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
    products.push(createProduct());
    }

    return {
    name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    sex: faker.person.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    products,
    image: faker.image.avatarLegacy(),
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    };
};

export  const createProduct = ()=>{
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        id: faker.database.mongodbObjectId(),
    };
}

export default __dirname;