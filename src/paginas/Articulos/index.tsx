import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { Delete, Edit } from "@mui/icons-material";
import ModalCrearArticulo from "./ModalCrearArticulo";
import ModalEditarArticulo from "./ModalEditarArticulo";
import ModalEliminarArticulo from "./ModalEliminarArticulo";

export default function PaginaArticulos() {
  const [nombreBuscado, setNombreBuscado] = useState<string>("");
  const [creandoArticulo, setCreandoArticulo] = useState<boolean>(false);
  const [editandoArticulo, setEditandoArticulo] = useState<null | {
    nombre: string;
    stockActual: number;
  }>(null);
  const [eliminandoArticulo, setEliminandoArticulo] = useState<null | {
    nombre: string;
    stockActual: number;
  }>(null);

  const columnasTabla: PropsTablaDeDatos<{ nombre: string; stockActual: number }>["columnas"] = [
    {
      visible: true,
      nombreMostrado: "Nombre",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      visible: true,
      nombreMostrado: "Stock",
      elementoMostrado: (articulo) => articulo.stockActual,
    },
    {
      visible: true,
      nombreMostrado: "Acciones",
      elementoMostrado: (articulo) => (
        <div className={styles["celda-acciones"]}>
          <IconButton onClick={() => setEditandoArticulo(articulo)}>
            <Edit color="info" />
          </IconButton>
          <IconButton onClick={() => setEliminandoArticulo(articulo)}>
            <Delete color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal open={creandoArticulo} onClose={() => setCreandoArticulo(false)}>
        <ModalCrearArticulo onClose={() => setCreandoArticulo(false)} />
      </Modal>
      <Modal open={editandoArticulo !== null} onClose={() => setEditandoArticulo(null)}>
        <ModalEditarArticulo
          articulo={editandoArticulo!}
          onClose={() => setEditandoArticulo(null)}
        />
      </Modal>
      <Modal open={eliminandoArticulo !== null} onClose={() => setEliminandoArticulo(null)}>
        <ModalEliminarArticulo
          articulo={eliminandoArticulo!}
          onClose={() => setEliminandoArticulo(null)}
        />
      </Modal>
      <div className={styles["contenedor-pantalla"]}>
        <div className={styles["buscador-boton"]}>
          <TextField
            onChange={(e) => setNombreBuscado(e.target.value)}
            label="Buscar por nombre"
            variant="outlined"
            size="small"
          />
          <Button onClick={() => setCreandoArticulo(true)} variant="contained" color="success">
            Crear articulo
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          <TablaDeDatos
            columnas={columnasTabla}
            filas={[{ nombre: "Articulo 1", stockActual: 10 }]}
          />
        </div>
      </div>
    </>
  );
}
