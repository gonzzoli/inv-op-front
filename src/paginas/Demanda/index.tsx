import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import styles from "./styles.module.scss";

export default function PaginaDemanda() {
  const columnasTabla: PropsTablaDeDatos<{
    id: number;
    fechaDesde: Date;
    fechaHasta: Date;
    articulo: string;
  }>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (demanda) => demanda.articulo,
    },
    {
      nombreMostrado: "Rango fecha",
      elementoMostrado: (demanda) =>
        `${demanda.fechaDesde.toLocaleString()} - ${demanda.fechaHasta.toLocaleString()}`,
    },
  ];
  return (
    <div>
      <div className={styles["contenedor-tabla"]}>
        <TablaDeDatos
          columnas={columnasTabla}
          filas={[
            { id: 1, articulo: "Articulo 1", fechaDesde: new Date(), fechaHasta: new Date() },
          ]}
        />
      </div>
    </div>
  );
}
