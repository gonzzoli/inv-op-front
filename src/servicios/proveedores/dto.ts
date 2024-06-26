import { ModeloInventario } from "../tiposEntidades";

export type CrearProveedorDTO = {
  nombre: string;
  articulos: {
    idArticulo: number;
    demoraPromedio: number;
  }[];
};

export type EditarProveedorDTO = {
  id: number;
  nombre: string;
};

export type CrearProveedorArticuloDTO = {
  proveedorId: number;
  articuloId: number;
  demora: number;
  costoPedido: number;
  precioPorUnidad: number;
  nivelDeServicio: number;
  periodoDeRevision?: number;
  anoCalculo: number;
};

export type EditarProveedorArticuloDTO = {
  proveedorArticuloId: number;
  demora: number;
};

export type EliminarProveedorArticuloDTO = {
  proveedorArticuloId: number;
};
