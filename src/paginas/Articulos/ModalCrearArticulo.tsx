import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useModelosInventario } from "@src/servicios/articulos";

type DatosFormularioCrearArticulo = {
  nombre: string;
  stockActual: number;
  modeloInventario: string;
};

export default function ModalCrearArticulo({ onClose }: { onClose: () => void }) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosFormularioCrearArticulo>();
  const queryModelosInventario = useModelosInventario();

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
          rules={{ required: true }}
          render={({ field }) => <TextField error={!!errors.nombre} {...field} label="Nombre" />}
        />
        <Controller
          control={control}
          name="stockActual"
          render={({ field }) => (
            <TextField error={!!errors.stockActual} {...field} label="Stock actual" type="number" />
          )}
        />
        {queryModelosInventario.isSuccess && (
          <Controller
            control={control}
            name="modeloInventario"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                label="Modelo de inventario"
                value={value}
                error={!!errors.modeloInventario}
              >
                {/* no va a funcionar porque solo tengo el string y no el id. bah depende como lo manejan en el back */}
                {queryModelosInventario.data.map((modelo, index) => (
                  <MenuItem key={index} value={modelo}>
                    {modelo}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        )}
        <Button variant="contained" type="submit" color="success">
          Crear
        </Button>
      </form>
    </div>
  );
}
