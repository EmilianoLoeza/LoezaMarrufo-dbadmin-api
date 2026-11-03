import { Router } from "express";
import { getProducto } from "../controllers/producto.controller.js";
import { createProducto } from "../controllers/producto.controller.js";
const router = Router();
router.get("/", getProducto);
router.post("/create", createProducto);
export default router;

