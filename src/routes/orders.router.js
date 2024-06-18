
import { Router } from "express";
import {
saveOrder,
getOrderById,
getOrders,
} from "../controllers/order.controller.js";
const router = Router();
router.get("/", getOrders);
router.get("/:oid", getOrderById);
router.post("/", saveOrder);
export default router;