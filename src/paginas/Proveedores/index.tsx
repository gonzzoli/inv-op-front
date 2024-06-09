import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useProveedores } from "../../servicios/proveedores";
import ModalCrearProveedor from "./ModalCrearProveedor";
import { Proveedor } from "../../servicios/tiposEntidades";
import { useDebounceValue } from "usehooks-ts";
import { Edit } from "@mui/icons-material";
import ModalEditarProveedor from "./ModalEditarProveedor";

export default function PaginaProveedores() {
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 300);
  const queryProveedores = useProveedores(nombreBuscado);
  const [creandoProveedor, setCreandoProveedor] = useState<boolean>(false);
  const [editandoProveedor, setEditandoProveedor] = useState<Proveedor | null>(null);

  const columnasTabla: PropsTablaDeDatos<Proveedor>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (proveedor) => proveedor.nombre,
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (proveedor) => (
        <div className={styles["celda-acciones"]}>
          <IconButton onClick={() => setEditandoProveedor(proveedor)}>
            <Edit color="info" />
          </IconButton>
        </div>
      ),
    },
  ];

  if (!queryProveedores.isSuccess) return <h1>Cargando...</h1>;

  return (
    <>
      <Modal open={creandoProveedor} onClose={() => setCreandoProveedor(false)}>
        <ModalCrearProveedor onClose={() => setCreandoProveedor(false)} />
      </Modal>
      <Modal open={editandoProveedor !== null} onClose={() => setEditandoProveedor(null)}>
        <ModalEditarProveedor
          proveedor={editandoProveedor!}
          onClose={() => setEditandoProveedor(null)}
        />
      </Modal>
      <div className={styles["contenedor-pantalla"]}>
        <div className={styles["buscador-boton"]}>
          <Button onClick={() => setCreandoProveedor(true)} variant="contained" color="success">
            Crear proveedor
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          <TablaDeDatos columnas={columnasTabla} filas={queryProveedores.data!} />
        </div>
      </div>
    </>
  );
}