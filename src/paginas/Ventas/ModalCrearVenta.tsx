import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useState } from "react";
import { Articulo } from "../../servicios/tiposEntidades";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useArticulos } from "../../servicios/articulos/articulos";
import { useCrearVenta } from "../../servicios/ventas/ventas";
import { CrearVentaDTO } from "../../servicios/ventas/dto";

const ModalCrearVenta = ({ onClose }: { onClose: () => void }) => {
  const mtnCrearVenta = useCrearVenta();
  const [nombreBuscado, setNombreBuscado] = useState<string | undefined>(undefined);
  const queryArticulos = useArticulos(nombreBuscado ?? "");

  const { control, handleSubmit, setValue, watch, reset } = useForm<CrearVentaDTO>({
    defaultValues: { fechaHoraAlta: dayjs().format("YYYY-MM-DD") },
  });

  const columnasTabla: PropsTablaDeDatos<Articulo>["columnas"] = [
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

  if (!queryArticulos.isSuccess) return <h1>Cargando...</h1>;

  return (
    <div className={styles["modal-crear-venta"]}>
      <h2>Crear una venta</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => mtnCrearVenta.mutate(dto, { onSuccess: onClose }))}
      >
        {!watch("articuloId") && (
          <>
            <TextField
              size="small"
              onChange={(e) => setNombreBuscado(e.currentTarget.value)}
              placeholder="Buscar articulo"
            />
            <div className={styles["contenedor-tabla"]}>
              <TablaDeDatos columnas={columnasTabla} filas={queryArticulos.data!} />
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
                  queryArticulos.data!.find((articulo) => articulo.id === watch("articuloId"))
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
                name="fechaHoraAlta"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    value={dayjs(value)}
                    onChange={(fecha: Dayjs | null) => {
                      if (!fecha) {
                        alert("Debe seleccionar una fecha");
                        return;
                      }
                      onChange(fecha.format("YYYY-MM-DD"));
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
          disabled={!watch("articuloId") || !watch("cantidad") || !watch("fechaHoraAlta")}
          variant="contained"
          type="submit"
          color="success"
        >
          Crear
        </Button>
      </form>
    </div>
  );
};

export default ModalCrearVenta;
