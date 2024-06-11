import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, IconButton, TextField } from "@mui/material";
import { CrearProveedorDTO } from "@servicios/proveedores/dto";
import { useCrearProveedor } from "@servicios/proveedores";
import { useDebounceValue } from "usehooks-ts";
import { useArticulos } from "@servicios/articulos";
import TablaDeDatos, { PropsTablaDeDatos } from "@src/componentes/Tabla";
import { Articulo } from "@src/servicios/tiposEntidades";
import { Add, Delete } from "@mui/icons-material";

const ModalCrearProveedor = ({ onClose }: { onClose: () => void }) => {
  const mtnCrearProveedor = useCrearProveedor();
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 200);
  const queryArticulos = useArticulos(nombreBuscado);

  const { control, handleSubmit, watch, getValues, setValue } = useForm<CrearProveedorDTO>({
    defaultValues: { articulos: [] },
  });

  const columnasTablaArticulos: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Articulos",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Añadir",
      elementoMostrado: (articulo) => (
        <IconButton
          color="success"
          onClick={() =>
            setValue("articulos", [
              ...getValues("articulos"),
              { idArticulo: articulo.id, demoraPromedio: 1 },
            ])
          }
        >
          <Add />
        </IconButton>
      ),
    },
  ];

  const columnasTablaArticulosAgregados: PropsTablaDeDatos<
    Articulo & { demoraPromedio: number }
  >["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Demora promedio",
      elementoMostrado: (articulo) => (
        <Controller
          control={control}
          name="articulos"
          render={({ field: { value } }) => (
            <TextField
              style={{ width: "100px" }}
              size="small"
              value={
                value.find((articuloAgregado) => articuloAgregado.idArticulo === articulo.id)
                  ?.demoraPromedio
              }
              onChange={(e) =>
                setValue(
                  "articulos",
                  getValues("articulos").map((articuloAgregado) =>
                    articuloAgregado.idArticulo === articulo.id
                      ? { ...articuloAgregado, demoraPromedio: Number(e.target.value) }
                      : articuloAgregado
                  )
                )
              }
              type="number"
            />
          )}
        />
      ),
    },
    {
      nombreMostrado: "Eliminar",
      elementoMostrado: (articulo) => (
        <IconButton
          color="error"
          onClick={() =>
            setValue(
              "articulos",
              getValues("articulos").filter(
                (articuloAgregado) => articuloAgregado.idArticulo !== articulo.id
              )
            )
          }
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div className={styles["modal-crear"]}>
        <h2>Crear un proveedor</h2>
        <form
          className={styles["form"]}
          onSubmit={handleSubmit((dto) => mtnCrearProveedor.mutate(dto, { onSuccess: onClose }))}
        >
          <Controller
            control={control}
            name="nombre"
            render={({ field }) => (
              <TextField size="small" {...field} label="Nombre del proveedor" />
            )}
          />
          <div className={styles["contenedor-tablas"]}>
            <h2>Añadir articulos al proveedor</h2>
            <h4>Articulos añadidos</h4>
            {queryArticulos.isSuccess && (
              <TablaDeDatos
                columnas={columnasTablaArticulosAgregados}
                filas={watch("articulos").map((articuloAgregado) => ({
                  ...queryArticulos.data.find(
                    (articulo) => articuloAgregado.idArticulo === articulo.id
                  )!,
                  demoraPromedio: 1,
                }))}
              />
            )}
            <h4>Añadir articulos</h4>
            <TextField
              label="Nombre del articulo"
              size="small"
              onChange={(e) => setNombreBuscado(e.target.value)}
            />
            {queryArticulos.isSuccess && (
              <TablaDeDatos
                columnas={columnasTablaArticulos}
                filas={queryArticulos.data.filter(
                  (articulo) =>
                    !watch("articulos").find(
                      (articuloAgregado) => articulo.id === articuloAgregado.idArticulo
                    )
                )}
              />
            )}
          </div>

          <Button disabled={!watch("nombre")} variant="contained" type="submit" color="success">
            Crear
          </Button>
        </form>
      </div>
    </>
  );
};

export default ModalCrearProveedor;
