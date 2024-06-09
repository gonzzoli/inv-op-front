import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import { CrearProveedorDTO } from "../../servicios/proveedores/dto";
import { useCrearProveedor } from "../../servicios/proveedores";

const ModalCrearProveedor = ({ onClose }: { onClose: () => void }) => {
  const mtnCrearProveedor = useCrearProveedor();

  const { control, handleSubmit, watch } = useForm<CrearProveedorDTO>();

  return (
    <div className={styles["modal-crear-Proveedor"]}>
      <h2>Crear un proveedor</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => mtnCrearProveedor.mutate(dto, { onSuccess: onClose }))}
      >
        <div className={styles["inputs"]}>
          <Controller
            control={control}
            name="nombre"
            render={({ field }) => <TextField {...field} label="Nombre del proveedor" />}
          />
        </div>
        <Button disabled={!watch("nombre")} variant="contained" type="submit" color="success">
          Crear
        </Button>
      </form>
    </div>
  );
};

export default ModalCrearProveedor;
