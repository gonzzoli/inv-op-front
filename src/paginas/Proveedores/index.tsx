import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useProveedores } from "../../servicios/proveedores";
import ModalCrearProveedor from "./ModalCrearProveedor";
import { Proveedor } from "../../servicios/tiposEntidades";
import { useDebounceValue } from "usehooks-ts";
import { Edit, ShoppingCart } from "@mui/icons-material";
import ModalEditarProveedor from "./ModalEditarProveedor";
import ModalCrearProveedorArticulo from "./ModalAgregarArticulo";

export default function PaginaProveedores() {
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 300);
  const queryProveedores = useProveedores(nombreBuscado);
  const [creandoProveedor, setCreandoProveedor] = useState<boolean>(false);
  const [editandoProveedor, setEditandoProveedor] = useState<Proveedor | null>(null);
  const [agregandoArticulo, setAgregandoArticulo] = useState<Proveedor | null>(null);

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
          <IconButton onClick={() => setAgregandoArticulo(proveedor)}>
            <ShoppingCart color="success" />
          </IconButton>
        </div>
      ),
    },
  ];
  useEffect(() => console.log(queryProveedores.data), [queryProveedores]);

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
      <Modal open={agregandoArticulo !== null} onClose={() => setAgregandoArticulo(null)}>
        <ModalCrearProveedorArticulo
          proveedor={agregandoArticulo!}
          onClose={() => setAgregandoArticulo(null)}
        />
      </Modal>
      <div className={styles["contenedor-pantalla"]}>
        <div className={styles["buscador-boton"]}>
          <TextField size="small" onChange={(e) => setNombreBuscado(e.target.value)} />
          <Button onClick={() => setCreandoProveedor(true)} variant="contained" color="success">
            Crear proveedor
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          {!queryProveedores.isSuccess && <h1>Cargando...</h1>}
          {queryProveedores.isSuccess && (
            <TablaDeDatos columnas={columnasTabla} filas={queryProveedores.data!} />
          )}
        </div>
      </div>
    </>
  );
}
