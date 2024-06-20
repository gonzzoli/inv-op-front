import { useState } from "react";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useDemandaHistorica, useTiposPeriodoDemanda } from "../../servicios/demanda";
import { Articulo, DemandaHistorica, TipoPeriodoDemanda } from "../../servicios/tiposEntidades";
import styles from "./styles.module.scss";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useArticulos } from "../../servicios/articulos";
import { useDebounceValue } from "usehooks-ts";

export default function PaginaDemanda() {
  const [tipoPeriodoElegido, setTipoPeriodoElegido] = useState<TipoPeriodoDemanda | null>(null);
  const [articuloElegido, setArticuloElegido] = useState<Articulo | null>(null);
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 300);
  const queryArticulos = useArticulos(nombreBuscado);
  const queryTiposPeriodo = useTiposPeriodoDemanda();
  const queryDemanda = useDemandaHistorica(articuloElegido, tipoPeriodoElegido);

  const columnasTablaArticulos: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (articulo) => (
        <Button size="small" color="primary" onClick={() => setArticuloElegido(articulo)}>
          Seleccionar
        </Button>
      ),
    },
  ];

  const columnasTablaDemandas: PropsTablaDeDatos<DemandaHistorica>["columnas"] = [
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

  return (
    <div className={styles["contenedor-pagina"]}>
      <div className={styles["contenedor-visualizacion"]}>
        <div className={styles["busqueda-articulos"]}>
          <div className={styles["inputs-busqueda"]}>
            <TextField
              label="Buscar por nombre"
              placeholder="Nombre del articulo..."
              onChange={(e) => setNombreBuscado(e.target.value)}
            />
            {queryTiposPeriodo.isSuccess && (
              <div className={styles["dropdown"]}>
                <InputLabel id="select-periodo-label">Periodo de demanda</InputLabel>
                <Select
                  onChange={(e) =>
                    setTipoPeriodoElegido(
                      queryTiposPeriodo.data.find((p) => p.id == e.target.value)!
                    )
                  }
                  value={tipoPeriodoElegido?.id}
                  label="Periodo"
                  labelId="select-periodo-label"
                >
                  {queryTiposPeriodo.data.map((tipoPeriodo, key) => (
                    <MenuItem value={tipoPeriodo.id} key={key}>
                      {tipoPeriodo.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </div>
          {queryArticulos.isSuccess && (
            <TablaDeDatos
              columnas={columnasTablaArticulos}
              filas={queryArticulos.data.slice(0, 10)}
            />
          )}
        </div>
        <div className={styles["tabla-demanda"]}>
          <h3>
            {articuloElegido && tipoPeriodoElegido
              ? `Demanda ${tipoPeriodoElegido.nombre} para ${articuloElegido.nombre}`
              : "Demanda"}
          </h3>
          {queryDemanda.isSuccess && (
            <TablaDeDatos columnas={columnasTablaDemandas} filas={queryDemanda.data} />
          )}
        </div>
      </div>
      <div className={styles["contenedor-prediccion"]}>
        <h1>Predicción de demanda</h1>
      </div>
    </div>
  );
}
