import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import { Proveedor } from "../../servicios/tiposEntidades";

type DatosFormularioEditarProveedor = Proveedor;

export default function ModalEditarProveedor({
  onClose,
  proveedor,
}: {
  onClose: () => void;
  proveedor: Proveedor;
}) {
  const { control, handleSubmit } = useForm<DatosFormularioEditarProveedor>({
    defaultValues: proveedor,
  });

  return (
    <div className={styles["modal-editar"]}>
      <h2>Editar un Proveedor</h2>
      <h4>{proveedor.nombre}</h4>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          alert("Editado " + dto.nombre);
          onClose();
        })}
      >
        <Controller
          control={control}
          name="nombre"
          render={({ field }) => <TextField {...field} label="Nombre" size="small" />}
        />
        <Button variant="contained" type="submit" color="primary">
          Editar
        </Button>
      </form>
    </div>
  );
}
