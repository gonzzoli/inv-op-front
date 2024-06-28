import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, MenuItem, TextField } from "@mui/material";
import { Articulo } from "@src/servicios/tiposEntidades";
import { useEditarArticulo, useModelosInventario } from "@src/servicios/articulos";
import toast from "react-hot-toast";
import { TIPOS_PREDICCION } from "../Demanda";

export default function ModalEditarArticulo({
  onClose,
  articulo,
}: {
  onClose: () => void;
  articulo: Articulo;
}) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Articulo>({
    defaultValues: articulo,
  });
  const mtnEditarArticulo = useEditarArticulo();
  const queryModelosInventario = useModelosInventario();

  return (
    <div className={styles["modal-editar"]}>
      <h2>Editar un articulo</h2>
      <form
        className={styles["form"]}
        onSubmit={handleSubmit((dto) => {
          mtnEditarArticulo.mutate(dto, {
            onSuccess: () => {
              toast.success("Articulo modificado");
              onClose();
            },
          });
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
        <Controller
          control={control}
          name="tipoPrediccion"
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                onChange={onChange}
                label="Metodo prediccion predeterminado"
                value={value}
                select
                error={!!errors.tipoPrediccion}
              >
                {/* no va a funcionar porque solo tengo el string y no el id. bah depende como lo manejan en el back */}
                {TIPOS_PREDICCION.map((tipoPrediccion, index) => (
                  <MenuItem key={index} value={tipoPrediccion}>
                    {tipoPrediccion}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        />
        <Button variant="contained" type="submit" color="info">
          Editar
        </Button>
      </form>
    </div>
  );
}
