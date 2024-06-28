import { useEffect, useState } from "react";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import {
  useCalcularError,
  useDemandaHistorica,
  usePrediccionDemanda,
} from "../../servicios/demanda";
import { Articulo, DemandaHistorica, TipoPeriodo, Venta } from "../../servicios/tiposEntidades";
import styles from "./styles.module.scss";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useArticulos } from "../../servicios/articulos";
import { useDebounceValue } from "usehooks-ts";
import { Controller, useForm } from "react-hook-form";
import { PrediccionDemandaDTO, TipoPrediccion } from "@src/servicios/demanda/dto";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  DemandaPorPeriodo,
  useDemandaHistoricaPorArticuloPeriodo,
  useVentasPorArticulo,
} from "@src/servicios/ventas";

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const TIPOS_PERIODO: TipoPeriodo[] = ["ANUAL", "SEMESTRAL", "TRIMESTRAL", "MENSUAL", "BIMESTRAL"];
const TIPOS_PREDICCION: TipoPrediccion[] = ["PROM_MOVIL", "PROM_MOVIL_PONDERADO", "EXPONENCIAL"];

export default function PaginaDemanda() {
  const [tipoPeriodoElegido, setTipoPeriodoElegido] = useState<TipoPeriodo>("MENSUAL");
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PrediccionDemandaDTO>({
    defaultValues: {
      fechaDesdePrediccion: dayjs().startOf("year").format("YYYY-MM-DD"),
      tipoPeriodo: tipoPeriodoElegido,
      tipoPrediccion: "PROM_MOVIL",
    },
  });
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 300);
  const [articuloElegido, setArticuloElegido] = useState<Articulo | null>(null);
  const queryArticulos = useArticulos(nombreBuscado);
  // const queryDemanda = useDemandaHistorica(watch("articuloId"), tipoPeriodoElegido);
  const queryVentasDeArticulo = useDemandaHistoricaPorArticuloPeriodo(
    watch("articuloId"),
    tipoPeriodoElegido
  );

  const queryPrediccion = usePrediccionDemanda(watch());
  const queryCalculoError = useCalcularError(watch("articuloId"));

  const columnasTablaArticulos: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (articulo) => (
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setValue("articuloId", articulo.id);
            setArticuloElegido(articulo);
          }}
        >
          Seleccionar
        </Button>
      ),
    },
  ];

  const columnasTablaDemandas: PropsTablaDeDatos<DemandaPorPeriodo>["columnas"] = [
    {
      nombreMostrado: "Periodo",
      elementoMostrado: (demanda) =>
        `${demanda.fechaInicioPeriodo.format("YYYY-MM-DD")} / ${demanda.fechaFinPeriodo.format("YYYY-MM-DD")}`,
    },
    {
      nombreMostrado: "Cantidad vendida",
      elementoMostrado: (demanda) => demanda.cantidadVendida,
    },
    // {
    //   nombreMostrado: "Rango fecha",
    //   elementoMostrado: (demanda) => `${demanda.fechaDesde} / ${demanda.fechaHasta}`,
    // },
  ];

  return (
    <div className={styles["contenedor-pagina"]}>
      <div className={styles["contenedor-visualizacion"]}>
        <div className={styles["busqueda-articulos"]}>
          <div className={styles["inputs-busqueda"]}>
            <TextField
              label="Buscar articulo por nombre"
              placeholder="Nombre del articulo..."
              onChange={(e) => setNombreBuscado(e.target.value)}
            />

            <div className={styles["dropdown"]}>
              <InputLabel id="select-periodo-label">Periodo de demanda</InputLabel>
              <Select
                onChange={(e) => {
                  setTipoPeriodoElegido(e.target.value as TipoPeriodo);
                  setValue("tipoPeriodo", e.target.value as TipoPeriodo);
                }}
                value={tipoPeriodoElegido}
                label="Periodo"
                labelId="select-periodo-label"
              >
                {TIPOS_PERIODO.map((tipoPeriodo, key) => (
                  <MenuItem value={tipoPeriodo} key={key}>
                    {tipoPeriodo}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          {queryArticulos.isSuccess && (
            <TablaDeDatos
              columnas={columnasTablaArticulos}
              filas={queryArticulos.data.slice(0, 10)}
            />
          )}
        </div>
        <div className={styles["tabla-demanda"]}>
          <h2>
            {watch("articuloId") && !!articuloElegido && tipoPeriodoElegido
              ? `Demanda ${tipoPeriodoElegido} para ${articuloElegido.nombre}`
              : "Demanda"}
          </h2>
          {queryVentasDeArticulo.isSuccess && (
            <TablaDeDatos columnas={columnasTablaDemandas} filas={queryVentasDeArticulo.data} />
          )}
        </div>
      </div>
      <div className={styles["contenedor-prediccion"]}>
        <h1>Predicción de demanda</h1>
        <p>
          <strong>Articulo:</strong> {articuloElegido?.nombre}
        </p>
        <p>
          <strong>Tipo de periodo:</strong> {tipoPeriodoElegido}
        </p>
        <div>
          <strong>Calculos de error:</strong>
          <ul style={{ paddingLeft: "2rem" }}>
            {queryCalculoError.data &&
              queryCalculoError.data.length > 1 &&
              queryCalculoError.data.map((calculo) => (
                <li style={{ display: "flex", gap: "1rem" }}>
                  <p>
                    <strong>Metodo: </strong> {calculo.tipoPrediccion}
                  </p>
                  <p>
                    <strong>Error: </strong> {calculo.error}
                  </p>
                </li>
              ))}
          </ul>
        </div>

        <div className={styles["inputs-prediccion"]}>
          <Controller
            name="tipoPrediccion"
            rules={{ required: true }}
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className={styles["dropdown"]}>
                <InputLabel id="select-metodo-label">Método de predicción</InputLabel>
                <Select
                  onChange={onChange}
                  value={value}
                  label="Método de predicción"
                  labelId="select-metodo-label"
                >
                  {TIPOS_PREDICCION.map((tipoPrediccion, key) => (
                    <MenuItem value={tipoPrediccion} key={key}>
                      {tipoPrediccion}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="numeroPeriodos"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                size="small"
                label="Numero de periodos previos"
                value={value}
                onChange={(e) => {
                  if (Number(e.currentTarget.value) < 0) return;
                  onChange(Number(e.currentTarget.value));
                }}
                type="number"
              />
            )}
          />
          <Controller
            control={control}
            name="cantidadPredicciones"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                size="small"
                label="Cantidad de periodos a predecir"
                value={value}
                onChange={(e) => {
                  if (Number(e.currentTarget.value) < 0) return;
                  onChange(Number(e.currentTarget.value));
                }}
                type="number"
              />
            )}
          />
          <Controller
            name="fechaDesdePrediccion"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                shouldDisableDate={(fecha) => !fecha.isSame(fecha.startOf("month"))}
                label="Fecha de periodo a predecir"
                format="YYYY-MM-DD"
                value={dayjs(value) ?? dayjs()}
                sx={{
                  background: "white",
                  border: errors.fechaDesdePrediccion ? "1px solid red" : "",
                  borderRadius: errors.fechaDesdePrediccion ? "5px" : "",
                }}
                onChange={(e) => onChange(e?.format("YYYY-MM-DD"))}
              />
            )}
          />
        </div>
        {watch("tipoPrediccion") === "PROM_MOVIL_PONDERADO" && (
          <div className={styles["ponderaciones"]}>
            {Array.from({ length: watch("numeroPeriodos") }).map((_, key) => (
              <Controller
                key={key}
                name={`ponderaciones.${key}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label={`Ponderación periodo ${key + 1}`}
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
            ))}
          </div>
        )}
        {watch("tipoPrediccion") === "EXPONENCIAL" && (
          <div className={styles["ponderaciones"]}>
            <Controller
              name="alpha"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  size="small"
                  label="Alpha de prediccion"
                  value={value}
                  onChange={(e) => {
                    if (Number(e.currentTarget.value) < 0 || Number(e.currentTarget.value) > 1)
                      return;
                    onChange(Number(e.currentTarget.value));
                  }}
                  type="number"
                />
              )}
            />
          </div>
        )}
        {queryPrediccion.data && (
          <div className={styles["resultado-prediccion"]}>
            <h2>Resultados</h2>
            {queryPrediccion.data.map((prediccion) => (
              <div className={styles["prediccion"]}>
                <h3>
                  Periodo: {prediccion.fechaDesdePrediccion} hasta {prediccion.fechaHastaPrediccion}
                </h3>
                <p>
                  <strong>Cantidad predecida: </strong> {prediccion.cantidadPredecida}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
