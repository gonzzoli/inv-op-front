import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import styles from "./styles.module.scss";

export default function PaginaOrdenesDeCompra() {
  const columnasTabla: PropsTablaDeDatos<{
    id: number;
    cantidad: number;
    fechaOrden: Date;
    articulo: string;
  }>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (orden) => orden.articulo,
    },
    {
      nombreMostrado: "Cantidad",
      elementoMostrado: (orden) => orden.cantidad,
    },
    {
      nombreMostrado: "Fecha pedido",
      elementoMostrado: (orden) => orden.fechaOrden.toLocaleString(),
    },
  ];
  return (
    <div>
      <div className={styles["contenedor-tabla"]}>
        <TablaDeDatos
          columnas={columnasTabla}
          filas={[{ id: 1, articulo: "Articulo 1", cantidad: 10, fechaOrden: new Date() }]}
        />
      </div>
    </div>
  );
}
