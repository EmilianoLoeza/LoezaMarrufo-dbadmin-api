import { Request, Response } from "express";
import { productoRepository } from "../repository/ProductoRepository.js";

export const getProducto = async (req: Request, res: Response) => {
    const producto = await productoRepository.findById(1);
    return res.json(producto);
};

export const createProducto = async (req: Request, res: Response) => {
    const {nombre, precio, stock, categoriaId} = req.body;
    const producto = await productoRepository.create({nombre, precio, stock, categoriaId});
    return res.json(producto);
} 

