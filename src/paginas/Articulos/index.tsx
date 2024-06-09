import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { Delete, Edit } from "@mui/icons-material";
import ModalCrearArticulo from "./ModalCrearArticulo";
import ModalEditarArticulo from "./ModalEditarArticulo";
import ModalEliminarArticulo from "./ModalEliminarArticulo";
import { Articulo } from "../../servicios/tiposEntidades";
import { useArticulos } from "../../servicios/articulos";
import { useDebounceValue } from "usehooks-ts";

export default function PaginaArticulos() {
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 300);
  const queryArticulos = useArticulos(nombreBuscado);
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
            label="Buscar por nombre"
            placeholder="Nombre del articulo..."
            onChange={(e) => setNombreBuscado(e.target.value)}
          />
          <Button onClick={() => setCreandoArticulo(true)} variant="contained" color="success">
            Crear articulo
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          {queryArticulos.isLoading && <h1>Cargando...</h1>}
          {queryArticulos.isError && <h1>Ocurrio un error buscando los articulos</h1>}
          {queryArticulos.isSuccess && (
            <TablaDeDatos columnas={columnasTabla} filas={queryArticulos.data} />
          )}
        </div>
      </div>
    </>
  );
}
