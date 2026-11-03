import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entity/Categoria.js";
import { Producto } from "../entity/Producto.js";
import { Venta } from "../entity/Venta.js";
import { DetalleVenta } from "../entity/DetalleVenta.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ventas_db",
    synchronize: false,
    logging: true,
    entities: [Categoria, Producto, Venta, DetalleVenta],
    subscribers: [],
    migrations: [],
});
