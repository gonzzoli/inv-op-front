import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useEffect, useState } from "react";
import { Articulo } from "../../servicios/tipos";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { buscarArticulosPorNombre } from "../../servicios/articulos";

type DatosFormularioCrearVenta = {
  articuloId: number;
  cantidad: number;
  fecha: Date;
};

export default function ModalCrearVenta({ onClose }: { onClose: () => void }) {
  const [nombreBuscado, setNombreBuscado] = useState<string | undefined>(undefined);
  const { control, handleSubmit, setValue } = useForm<DatosFormularioCrearVenta>();
  const [articulosEncontrados, setArticulosEncontrados] = useState<Articulo[]>([]);

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
        <div className={styles["celda-acciones"]}>
          <Button onClick={() => setValue("articuloId", articulo.id)}> Seleccionar</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const articulos = await buscarArticulosPorNombre(nombreBuscado);
      setArticulosEncontrados(articulos);
    })();
  }, [nombreBuscado]);

  return (
    <div className={styles["modal-crear-venta"]}>
      <h2>Crear una venta</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          console.log(dto);
          onClose();
        })}
      >
        <TextField
          onChange={(e) => setNombreBuscado(e.currentTarget.value)}
          placeholder="Buscar articulo"
        />

        <TablaDeDatos columnas={columnasTabla} filas={articulosEncontrados} />
        <Controller
          control={control}
          name="cantidad"
          render={({ field }) => <TextField {...field} label="Cantidad vendida" type="number" />}
        />
        <DatePicker
          onChange={(fecha: Dayjs | null) => {
            if (!fecha) {
              alert("Debe seleccionar una fecha");
              return;
            }
            setValue("fecha", dayjs(fecha).toDate());
          }}
          label="Fecha de venta"
          closeOnSelect
          format="DD/MM/YYYY"
          className={styles["datepicker"]}
        />
        <Button variant="contained" type="submit" color="success">
          Crear
        </Button>
      </form>
    </div>
  );
}
