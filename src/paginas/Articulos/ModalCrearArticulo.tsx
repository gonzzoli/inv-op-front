import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";

type DatosFormularioCrearArticulo = {
  costoAlmacenamiento: number;
  costoOrden: number;
  loteOptimo: number;
  nombre: string;
  puntoPedido: number;
  stockActual: number;
  stockSeguridad: number;
  tiempoEntrePedidos: number;
};

export default function ModalCrearArticulo({ onClose }: { onClose: () => void }) {
  const { control, reset, handleSubmit } = useForm<DatosFormularioCrearArticulo>();
  return (
    <div className={styles["modal-crear"]}>
      <h2>Crear un articulo</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          console.log(dto);
          onClose();
        })}
      >
        <Controller
          control={control}
          name="nombre"
          render={({ field }) => <TextField {...field} label="Nombre" />}
        />
        <Controller
          control={control}
          name="stockActual"
          render={({ field }) => <TextField {...field} label="Stock actual" type="number" />}
        />
        <Button variant="contained" type="submit" color="success">
          Crear
        </Button>
      </form>
    </div>
  );
}
