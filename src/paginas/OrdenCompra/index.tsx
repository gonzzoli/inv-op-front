import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useOrdenesCompra } from "../../servicios/ordenesCompra/ordenesCompra";
import { OrdenCompra } from "../../servicios/tiposEntidades";
import styles from "./styles.module.scss";

export default function PaginaOrdenesDeCompra() {
  const queryOrdenes = useOrdenesCompra();

  const columnasTabla: PropsTablaDeDatos<OrdenCompra>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (orden) => orden.articuloId,
    },
    {
      nombreMostrado: "Cantidad",
      elementoMostrado: (orden) => orden.cantidad,
    },
    {
      nombreMostrado: "Fecha pedido",
      elementoMostrado: (orden) => orden.fechaHoraAlta.toLocaleString(),
    },
  ];

  if (!queryOrdenes.isSuccess) return <h1>Cargando...</h1>;

  return (
    <div>
      <div className={styles["contenedor-tabla"]}>
        <TablaDeDatos columnas={columnasTabla} filas={queryOrdenes.data!} />
      </div>
    </div>
  );
}
