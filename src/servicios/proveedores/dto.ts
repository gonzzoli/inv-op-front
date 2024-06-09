export type CrearProveedorDTO = {
  nombre: string;
  articulos: {
    id: number;
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
};

export type EditarProveedorArticuloDTO = {
  proveedorArticuloId: number;
  demora: number;
};

export type EliminarProveedorArticuloDTO = {
  proveedorArticuloId: number;
};
