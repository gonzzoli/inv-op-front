export type Articulo = {
  id: number;
  nombre: string;
  stockActual: number;
};

export type Venta = {
  articuloId: number;
  nombreArticulo: string;
  fecha: Date;
  cantidad: number;
};
