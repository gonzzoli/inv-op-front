import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";

type DatosFormularioEditarArticulo = {
  costoAlmacenamiento: number;
  costoOrden: number;
  loteOptimo: number;
  nombre: string;
  puntoPedido: number;
  stockActual: number;
  stockSeguridad: number;
  tiempoEntrePedidos: number;
};

export default function ModalEditarArticulo({
  onClose,
  articulo,
}: {
  onClose: () => void;
  articulo: { nombre: string; stockActual: number };
}) {
  const { control, reset, handleSubmit } = useForm<DatosFormularioEditarArticulo>({
    defaultValues: articulo,
  });

  return (
    <div className={styles["modal-editar"]}>
      <h2>Editar un articulo</h2>
      <h4>{articulo.nombre}</h4>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          alert("Editado");
          onClose();
        })}
      >
        <Controller
          control={control}
          name="nombre"
          render={({ field }) => <TextField {...field} label="Nombre" size="small" />}
        />
        <Controller
          control={control}
          name="stockActual"
          render={({ field }) => (
            <TextField {...field} label="Stock actual" type="number" size="small" />
          )}
        />
        <Button variant="contained" type="submit" color="primary">
          Editar
        </Button>
      </form>
    </div>
  );
}
