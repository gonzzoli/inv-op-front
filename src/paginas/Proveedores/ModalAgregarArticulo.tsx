import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, IconButton, TextField } from "@mui/material";
import { useCrearProveedorArticulo } from "@servicios/proveedores";
import { useDebounceValue } from "usehooks-ts";
import { useArticulos } from "@servicios/articulos";
import TablaDeDatos, { PropsTablaDeDatos } from "@src/componentes/Tabla";
import { Articulo, Proveedor } from "@src/servicios/tiposEntidades";
import { Add } from "@mui/icons-material";
import { CrearProveedorArticuloDTO } from "@src/servicios/proveedores/dto";

export default function ModalCrearProveedorArticulo({
  onClose,
  proveedor,
}: {
  onClose: () => void;
  proveedor: Proveedor;
}) {
  const mtnCrearProveedorArticulo = useCrearProveedorArticulo();
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 200);
  const queryArticulos = useArticulos(nombreBuscado);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CrearProveedorArticuloDTO>({
    defaultValues: { proveedorId: proveedor.id },
  });

  const columnasTablaArticulos: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Articulos",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Añadir",
      elementoMostrado: (articulo) => (
        <IconButton color="success" onClick={() => setValue("articuloId", articulo.id)}>
          <Add />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div className={styles["modal-crear"]}>
        <h2>Agregar articulo a un proveedor</h2>
        <form
          className={styles["form"]}
          onSubmit={handleSubmit((dto) =>
            mtnCrearProveedorArticulo.mutate(dto, { onSuccess: onClose })
          )}
        >
          {!watch("articuloId") ? (
            <div className={styles["contenedor-tablas"]}>
              <h4>Seleccionar articulo</h4>
              <TextField
                label="Nombre del articulo"
                size="small"
                onChange={(e) => setNombreBuscado(e.target.value)}
              />
              {queryArticulos.isSuccess && (
                <TablaDeDatos
                  columnas={columnasTablaArticulos}
                  filas={queryArticulos.data.slice(0, 5)}
                />
              )}
            </div>
          ) : (
            <div className={styles["contenedor-inputs"]}>
              <Controller
                control={control}
                name="demora"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Demora"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
              <Controller
                control={control}
                name="costoPedido"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Costo de pedido"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
              <Controller
                control={control}
                name="demanda"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Demanda"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
              <Controller
                control={control}
                name="precioPorUnidad"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Precio por unidad"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
            </div>
          )}

          <Button variant="contained" type="submit" color="success">
            Confirmar
          </Button>
        </form>
      </div>
    </>
  );
}
