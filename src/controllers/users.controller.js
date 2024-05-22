// export const getUsers= async (req,res)=>{
// res.send({status:"success", result:"getUsers"})
// } 
// export const getUserById= async (req,res)=>{
// res.send({status:"success", result:"getUserByID"})
// } 
// export const saveUser= async (req,res)=>{
// res.send({status:"success", result:"saveUser"})
// } 
import User from '../dao/Classes/users.dao.js'
//import User from '../dao/MYSQL/Classes/users.dao.js'

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

export const getUserById = async (req, res) => {
    const { uid } = req.params;
    const user = await userService.getUserById(uid);

    res.send({ status: "success", result: user });
};
export const saveUser = async (req, res) => {
    let user = req.body;
    const result = await userService.saveUser(user);
    res.send({ status: "success", result });
};
export const updateUser = async (req, res) => {
    res.send({ status: "success", result: "updateUser" });
};

export default new UserController();