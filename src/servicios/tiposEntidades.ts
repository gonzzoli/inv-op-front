export type ModeloInventario = "LOTE_FIJO" | "INTERVALO_FIJO";

export type Articulo = {
  id: number;
  nombre: string;
  stockActual: number;
  estadoArticulo: string;
  modeloInventario: ModeloInventario;
  costoAlmacenamiento: number;
};

export type EstadoArticulo = "A_REPONER" | "DISPONIBLE" | "NO_DISPONIBLE";

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

export type EstadoOrdenCompra = "PENDIENTE" | "CONFIRMADO";

export type EstadoProveedor = {
  id: number;
  nombreEstado: string;
};

export type OrdenCompra = {
  id: number;
  cantidad: number;
  demoraEstimada: number;
  fechaHoraAlta: Date;
  nroOrdenCompra: number;
  articulo: Articulo;
  proveedor: Proveedor;
  nombreEstado: EstadoOrdenCompra;
};

export type TipoPeriodo = "MENSUAL" | "TRIMESTRAL" | "SEMESTRAL" | "ANUAL" | "BIMESTRAL";

export type DemandaHistorica = {
  id: number;
  articulo: Articulo;
  cantidadTotal: number;
  fechaDesde: string;
  fechaHasta: string;
  tipoPeriodo: TipoPeriodo;
};

export type PrediccionDemanda = {
  cantidadPredecida: number;
  fechaDesdePrediccion: string;
  fechaHastaPrediccion: string;
  fechaPrediccionRealizada: string;
  nombreArticulo: string;
  idArticulo: number;
};
