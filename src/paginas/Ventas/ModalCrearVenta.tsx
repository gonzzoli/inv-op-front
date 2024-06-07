import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { forwardRef, useEffect, useState } from "react";
import { Articulo } from "../../servicios/tiposEntidades";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type DatosFormularioCrearVenta = {
  articuloId: number;
  cantidad: number;
  fecha: Date;
};
const ModalCrearVenta = forwardRef<HTMLDivElement, { onClose: () => void }>(({ onClose }, ref) => {
  const [nombreBuscado, setNombreBuscado] = useState<string | undefined>(undefined);
  const { control, handleSubmit, setValue, watch, reset, getValues } =
    useForm<DatosFormularioCrearVenta>({ defaultValues: { fecha: new Date() } });
  const [articulosEncontrados, setArticulosEncontrados] = useState<Articulo[]>([
    { nombre: "Zapatillas", stockActual: 10, id: 1 },
  ]);

  const columnasTabla: PropsTablaDeDatos<{
    id: number;
    nombre: string;
    stockActual: number;
  }>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Stock",
      elementoMostrado: (articulo) => articulo.stockActual,
    },
    {
      nombreMostrado: "",
      elementoMostrado: (articulo) => (
        <Button size="small" onClick={() => setValue("articuloId", articulo.id)}>
          Seleccionar
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // (async () => {
    //   const articulos = await buscarArticulosPorNombre(nombreBuscado);
    //   setArticulosEncontrados(articulos);
    // })();
  }, [nombreBuscado]);

  useEffect(() => console.log(getValues()));

  return (
    <div ref={ref} className={styles["modal-crear-venta"]}>
      <h2>Crear una venta</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          console.log(dto);
          onClose();
        })}
      >
        {!watch("articuloId") && (
          <>
            <TextField
              size="small"
              onChange={(e) => setNombreBuscado(e.currentTarget.value)}
              placeholder="Buscar articulo"
            />
            <div className={styles["contenedor-tabla"]}>
              <TablaDeDatos columnas={columnasTabla} filas={articulosEncontrados} />
            </div>
          </>
        )}
        {watch("articuloId") && (
          <>
            <Button
              style={{ maxWidth: "250px" }}
              variant="contained"
              size="small"
              onClick={() => reset()}
            >
              Seleccionar otro articulo
            </Button>
            <p style={{ margin: 0 }}>
              Articulo:{" "}
              <strong>
                {
                  articulosEncontrados.find((articulo) => articulo.id === watch("articuloId"))
                    ?.nombre
                }
              </strong>
            </p>
            <div className={styles["inputs"]}>
              <Controller
                control={control}
                name="cantidad"
                render={({ field }) => (
                  <TextField {...field} label="Cantidad vendida" type="number" />
                )}
              />

              <Controller
                control={control}
                name="fecha"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    value={dayjs(value)}
                    onChange={(fecha: Dayjs | null) => {
                      if (!fecha) {
                        alert("Debe seleccionar una fecha");
                        return;
                      }
                      onChange(fecha.toDate());
                    }}
                    label="Fecha de venta"
                    closeOnSelect
                    format="DD/MM/YYYY"
                    className={styles["datepicker"]}
                  />
                )}
              />
            </div>
          </>
        )}
        <Button
          disabled={!watch("articuloId") || !watch("cantidad") || !watch("fecha")}
          variant="contained"
          type="submit"
          color="success"
        >
          Crear
        </Button>
      </form>
    </div>
  );
});

export default ModalCrearVenta;
