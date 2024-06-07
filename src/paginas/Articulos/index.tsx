import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { Delete, Edit } from "@mui/icons-material";
import ModalCrearArticulo from "./ModalCrearArticulo";
import ModalEditarArticulo from "./ModalEditarArticulo";
import ModalEliminarArticulo from "./ModalEliminarArticulo";
import { Articulo } from "../../servicios/tiposEntidades";
import { useArticulos } from "../../servicios/articulos/articulos";

export default function PaginaArticulos() {
  const queryArticulos = useArticulos();
  const [creandoArticulo, setCreandoArticulo] = useState<boolean>(false);
  const [editandoArticulo, setEditandoArticulo] = useState<null | {
    nombre: string;
    stockActual: number;
  }>(null);
  const [eliminandoArticulo, setEliminandoArticulo] = useState<null | {
    nombre: string;
    stockActual: number;
  }>(null);

  const columnasTabla: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Stock",
      elementoMostrado: (articulo) => articulo.stockActual,
    },
    {
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

  if (!queryArticulos.isSuccess) return <h1>Cargando...</h1>;

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
          <Button onClick={() => setCreandoArticulo(true)} variant="contained" color="success">
            Crear articulo
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          <TablaDeDatos
            columnas={columnasTabla}
            filas={queryArticulos.data!}
          />
        </div>
      </div>
    </>
  );
}
