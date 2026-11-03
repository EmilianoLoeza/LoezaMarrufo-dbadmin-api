import { Request, Response } from 'express';
import { productoRepository } from '../repository/ProductoRepository.js';

const error500 = (res: Response, e: unknown) =>
    res.status(500).json({ error: (e as Error).message });

// GETALL
export const getAllProductos = async (_req: Request, res: Response) => {
    try {
        return res.json(await productoRepository.findAll());
    } catch (e) {
        return error500(res, e);
    }
};

// GETBYID
export const getProductoById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const producto = await productoRepository.findById(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.json(producto);
    } catch (e) {
        return error500(res, e);
    }
};

// POST
export const createProducto = async (req: Request, res: Response) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body;

        if (!nombre || precio === undefined || stock === undefined || !categoriaId) {
            return res.status(400).json({
                error: 'Faltan campos: nombre, precio, stock, categoriaId'
            });
        }

        const producto = await productoRepository.create({
            nombre,
            precio,
            stock,
            categoriaId
        });

        return res.status(201).json(producto);
    } catch (e) {
        return error500(res, e);
    }
};

// PUT
export const updateProducto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const existe = await productoRepository.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const { nombre, precio, stock, categoriaId } = req.body;

        const producto = await productoRepository.update(id, {
            nombre,
            precio,
            stock,
            categoriaId
        });

        return res.json(producto);
    } catch (e) {
        return error500(res, e);
    }
};

// DELETE
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const existe = await productoRepository.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await productoRepository.delete(id);

        return res.json({
            mensaje: 'Producto eliminado correctamente'
        });
    } catch (e) {
        return res.status(409).json({
            error: 'No se pudo eliminar. Puede tener ventas asociadas.',
            detalle: (e as Error).message
        });
    }
};