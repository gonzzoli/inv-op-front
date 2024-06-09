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

export type ModeloInventario = {
  id: number;
  nombre: string;
};

export type Venta = {
  id: number;
  articulo: Articulo;
  fechaHoraAlta: string;
  cantidad: number;
};

export type Proveedor = {
  id: number;
  fechaHoraBaja: Date;
  nombre: string;
};

export type ProveedorArticulo = {
  id: number;
  articulo: Articulo;
  proveedor: Proveedor;
  demoraPromedio: number;
  estadoActual: number;
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

export type TipoPeriodoDemanda = {
  id: number;
  nombre: string;
  cantidadDias: number;
};
