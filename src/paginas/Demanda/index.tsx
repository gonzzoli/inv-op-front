import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useDemandaHistorica } from "../../servicios/demanda";
import { DemandaHistorica } from "../../servicios/tiposEntidades";
import styles from "./styles.module.scss";

export default function PaginaDemanda() {
  const queryDemanda = useDemandaHistorica();
  const columnasTabla: PropsTablaDeDatos<DemandaHistorica>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (demanda) => demanda.articulo.nombre,
    },
    {
      nombreMostrado: "Rango fecha",
      elementoMostrado: (demanda) =>
        `${demanda.fechaDesde.toLocaleString()} - ${demanda.fechaHasta.toLocaleString()}`,
    },
  ];

  if (!queryDemanda.isSuccess) return <h1>Cargando...</h1>;

  return (
    <div>
      <div className={styles["contenedor-tabla"]}>
        <TablaDeDatos columnas={columnasTabla} filas={queryDemanda.data!} />
      </div>
    </div>
  );
}
