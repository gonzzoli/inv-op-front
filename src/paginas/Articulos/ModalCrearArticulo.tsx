import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCrearArticulo, useModelosInventario } from "@src/servicios/articulos";

type DatosFormularioCrearArticulo = {
  nombre: string;
  stockActual: number;
  modeloInventario: string;
  estadoArticulo: "DISPONIBLE";
  costoAlmacenamiento: number;
};

export default function ModalCrearArticulo({ onClose }: { onClose: () => void }) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosFormularioCrearArticulo>({ defaultValues: { estadoArticulo: "DISPONIBLE" } });
  const queryModelosInventario = useModelosInventario();
  const mtnCrearArticulo = useCrearArticulo();

  return (
    <div className={styles["modal-crear"]}>
      <h2>Crear un articulo</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          mtnCrearArticulo.mutate(dto)
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
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={(e) => (Number(e.currentTarget.value) < 0 ? null : onChange(e))}
              error={!!errors.stockActual}
              label="Stock actual"
              value={value}
              type="number"
            />
          )}
        />
        <Controller
          control={control}
          name="costoAlmacenamiento"
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={(e) => (Number(e.currentTarget.value) < 0 ? null : onChange(e))}
              error={!!errors.costoAlmacenamiento}
              label="Costo de almacenamiento"
              value={value}
              type="number"
            />
          )}
        />
        {queryModelosInventario.isSuccess && (
          <Controller
            control={control}
            name="modeloInventario"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  onChange={onChange}
                  label="Modelo de inventario"
                  value={value}
                  select
                  error={!!errors.modeloInventario}
                >
                  {/* no va a funcionar porque solo tengo el string y no el id. bah depende como lo manejan en el back */}
                  {queryModelosInventario.data.map((modelo, index) => (
                    <MenuItem key={index} value={modelo}>
                      {modelo}
                    </MenuItem>
                  ))}
                </TextField>
              </>
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
