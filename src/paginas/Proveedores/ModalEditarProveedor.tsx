import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, Modal, TextField } from "@mui/material";
import { Proveedor, ProveedorArticulo } from "../../servicios/tiposEntidades";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useState } from "react";
import ModalEliminarArticulo from "./ModalEliminarArticulo";
import { useArticulosProveedor } from "../../servicios/proveedores";

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

  const queryArticulosProveedor = useArticulosProveedor(proveedor.id);

  const columnasTabla: PropsTablaDeDatos<ProveedorArticulo>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (proveedorArticulo) => proveedorArticulo.articulo.nombre,
    },
    {
      nombreMostrado: "Demora",
      elementoMostrado: (proveedorArticulo) => proveedorArticulo.demoraPromedio,
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (proveedorArticulo) => (
        <Button onClick={() => console.log("nada")} size="small">
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* <Modal open={!eliminandoArticulo}>
        <ModalEliminarArticulo
          proveedorArticulo={eliminandoArticulo!}
          onClose={() => setEliminandoArticulo(null)}
        />
      </Modal> */}
      <div className={styles["modal-editar"]}>
        <h2>Editar un Proveedor</h2>
        <form
          className={styles["form"]}
          onSubmit={handleSubmit((dto) => {
            alert("Editado " + dto.nombre);
            onClose();
          })}
        >
          <h4>{proveedor.nombre}</h4>
          <Controller
            control={control}
            name="nombre"
            render={({ field }) => <TextField {...field} label="Nombre" size="small" />}
          />
          <Button variant="contained" type="submit" color="primary">
            Confirmar nombre
          </Button>
        </form>

        <h2>Articulos asociados</h2>
        <TablaDeDatos columnas={columnasTabla} filas={queryArticulosProveedor.data!} />
        <Button
          // onClick={() => setAgregandoArticulo(true)}
          variant="contained"
          color="success"
          size="small"
        >
          Agregar artículo
        </Button>
      </div>
    </>
  );
}
