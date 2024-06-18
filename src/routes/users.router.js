//import UsersController from '../controllers/users.controller.js'
import usersController from '../controllers/users.controller.js'

import { Router } from 'express'

//const usersController= new UsersController()
import {
    getUsers,
    getUserById,
    saveUser,
} from "../controllers/users.controller.js";
const router = Router();
//routes
router.get('/users', usersController.getAllUsers)
router.post('/users', usersController.createUser)
router.get("/", getUsers);
router.get("/:uid", getUserById);
router.post("/", saveUser);
router.get('/',usersController.getAllUsers);

router.get('/:uid',usersController.getUser);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);





export default router;