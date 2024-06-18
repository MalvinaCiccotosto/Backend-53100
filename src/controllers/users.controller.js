import User from '../dao/Classes/users.dao.js'
//import User from '../dao/MYSQL/Classes/users.dao.js'
import { usersService } from "../services/index.js"

const users = [];

const userService = new User();
export const getUsers = async (req, res) => {
const users = await userService.getUser();//revision
res.send({ status: "success", result: users });
};

class UserController {
constructor() {
    console.log("Controlador de usuarios");
}
getAllUsers(req, res) {
    res.status(200).json({ status: "success", users });
}

createUser(req, res) {
    const newUser = req.body;
    users.push(newUser);

    res.status(201).json({ status: "success", newUser });
}
}

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}



export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}

