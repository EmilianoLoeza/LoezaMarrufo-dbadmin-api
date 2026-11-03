import { Request, Response } from 'express';
import { ventaRepository } from '../repository/VentaRepository.js';

const error500 = (res: Response, e: unknown) =>
    res.status(500).json({ error: (e as Error).message });

// GETALL
export const getAllVentas = async (_req: Request, res: Response) => {
    try {
        return res.json(await ventaRepository.findAll());
    } catch (e) {
        return error500(res, e);
    }
};

// GETBYID
export const getVentaById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const venta = await ventaRepository.findById(id);

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        return res.json(venta);
    } catch (e) {
        return error500(res, e);
    }
};

// POST
export const createVenta = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'El body no puede estar vacío'
            });
        }

        const venta = await ventaRepository.create(req.body);

        return res.status(201).json(venta);
    } catch (e) {
        return error500(res, e);
    }
};

// PUT
export const updateVenta = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const existe = await ventaRepository.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        const { detalles, ventaId, ...datos } = req.body;

        const venta = await ventaRepository.update(id, datos);

        return res.json(venta);
    } catch (e) {
        return error500(res, e);
    }
};

// DELETE
export const deleteVenta = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const existe = await ventaRepository.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        await ventaRepository.delete(id);

        return res.json({
            mensaje: 'Venta eliminada correctamente'
        });
    } catch (e) {
        return res.status(409).json({
            error: 'No se pudo eliminar. Puede tener detalles asociados.',
            detalle: (e as Error).message
        });
    }
};