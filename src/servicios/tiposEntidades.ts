export type Articulo = {
  id: number;
  nombre: string;
  stockActual: number;
};

export type EstadoArticulo = {
  id: number;
  nombreEstado: string;
  fechaHoraAltaEstado: Date;
};

export type Venta = {
  id: number;
  articuloId: number;
  nombreArticulo: string;
  fecha: Date;
  cantidad: number;
};

export type Proveedor = {
  id: number;
  fechaHoraBaja: Date;
  nombre: string;
};

export type EstadoOrdenCompra = {
  id: number;
  fechaHoraBaja: Date;
  nombreEstado: string;
};

export type EstadoProveedor = {
  id: number;
  nombreEstado: string;
};

export type OrdenCompra = {
  id: number;
  articuloId: number;
  cantidad: number;
  fechaHoraAlta: Date;
  nroOrdenCompra: number;
  proveedor: Proveedor;
  estadoOrdenCompra: EstadoOrdenCompra;
};

export type DemandaHistorica = {
  id: number;
  articulo: Articulo;
  cantidadTotal: number;
  fechaDesde: Date;
  fechaHasta: Date;
  tipoPeriodo: string;
};
