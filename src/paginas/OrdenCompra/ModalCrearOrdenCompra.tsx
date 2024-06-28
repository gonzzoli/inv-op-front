import { useDebounceValue } from "usehooks-ts";
import styles from "./styles.module.scss";
import { Button, IconButton, TextField } from "@mui/material";
import { useArticulos } from "@src/servicios/articulos";
import { Controller, useForm } from "react-hook-form";
import { CrearOrdenCompraDTO } from "@src/servicios/ordenesCompra/dto";
import { useProveedorPredeterminadoDeArticulo, useProveedores } from "@src/servicios/proveedores";
import { Articulo, Proveedor } from "@src/servicios/tiposEntidades";
import TablaDeDatos, { PropsTablaDeDatos } from "@src/componentes/Tabla";
import { Add } from "@mui/icons-material";
import { useCrearOrdenCompra } from "@src/servicios/ordenesCompra";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ModalCrearOrdenCompra({ onClose }: { onClose: () => void }) {
  const [nombreArticuloBuscado, setNombreArticuloBuscado] = useDebounceValue("", 200);
  const [nombreProveedorBuscado, setNombreProveedorBuscado] = useDebounceValue("", 200);
  const queryArticulos = useArticulos(nombreArticuloBuscado);
  const queryProveedores = useProveedores(nombreProveedorBuscado);
  const mtnCrearOrdenCompra = useCrearOrdenCompra();

  const { control, handleSubmit, watch, setValue } = useForm<CrearOrdenCompraDTO>();

  const queryProveedorPredeterminado = useProveedorPredeterminadoDeArticulo(watch("articuloId"));

  const columnasTablaArticulos: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Seleccionar",
      elementoMostrado: (articulo) => (
        <IconButton color="success" onClick={() => setValue("articuloId", articulo.id)}>
          <Add />
        </IconButton>
      ),
    },
  ];

  const columnasTablaProveedores: PropsTablaDeDatos<Proveedor>["columnas"] = [
    {
      nombreMostrado: "Proveedor",
      elementoMostrado: (proveedor) => proveedor.nombre,
    },
    {
      nombreMostrado: "Seleccionar",
      elementoMostrado: (proveedor) => (
        <IconButton color="success" onClick={() => setValue("proveedorId", proveedor.id)}>
          <Add />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    if (queryProveedorPredeterminado.data)
      setValue("proveedorId", queryProveedorPredeterminado.data.id);
  }, [queryProveedorPredeterminado.data]);

  if (!queryArticulos.isSuccess || !queryProveedores.isSuccess) return <h1>Cargando...</h1>;

  return (
    <form
      onSubmit={handleSubmit((dto) =>
        mtnCrearOrdenCompra.mutate(dto, {
          onSuccess: () => {
            toast.success("Orden de compra creada");
            onClose();
          },
        })
      )}
      className={styles["modal-crear"]}
    >
      <h2>Crear una orden de compra</h2>
      <div className={styles["tablas-crear-orden"]}>
        {watch("articuloId") && (
          <p>
            <strong>Articulo: </strong>
            {queryArticulos.data.find((articulo) => articulo.id === watch("articuloId"))!.nombre}
          </p>
        )}
        {watch("proveedorId") && (
          <p>
            <strong>Proveedor: </strong>
            {
              queryProveedores.data.find((proveedor) => proveedor.id === watch("proveedorId"))!
                .nombre
            }
          </p>
        )}
        {!watch("articuloId") && (
          <>
            <TextField
              label="Nombre del articulo"
              size="small"
              onChange={(e) => setNombreArticuloBuscado(e.target.value)}
            />
            <TablaDeDatos columnas={columnasTablaArticulos} filas={queryArticulos.data} />
          </>
        )}
        {watch("articuloId") && !watch("proveedorId") && (
          <>
            <TextField
              label="Nombre del proveedor"
              size="small"
              onChange={(e) => setNombreProveedorBuscado(e.target.value)}
            />
            <TablaDeDatos columnas={columnasTablaProveedores} filas={queryProveedores.data} />
          </>
        )}
        {watch("articuloId") && watch("proveedorId") && (
          <div className={styles["inputs-orden-compra"]}>
            <Controller
              control={control}
              name="demoraEstimada"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  size="small"
                  label="Demora estimada"
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
              name="cantidad"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  size="small"
                  label="Cantidad"
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
      </div>
      <div className={styles["botones"]}>
        <Button color="error" onClick={onClose} variant="contained">
          Cancelar
        </Button>
        <Button color="success" type="submit" variant="contained">
          Crear orden
        </Button>
      </div>
    </form>
  );
}
