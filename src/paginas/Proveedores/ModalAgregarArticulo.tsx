import { Button, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useDebounceValue } from "usehooks-ts";
import { useArticulos } from "../../servicios/articulos";
import { useCrearProveedorArticulo } from "../../servicios/proveedores";
import { Articulo } from "../../servicios/tiposEntidades";
import { useState } from "react";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";

export default function ModalAgregarArticulo({ onClose }: { onClose: () => void }) {
  const mtnCrearProveedorArticulo = useCrearProveedorArticulo();
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 200);
  const queryArticulos = useArticulos(nombreBuscado);
  const [articuloElegido, setArticuloElegido] = useState<Articulo | null>(null);

  const columnasTabla: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (articulo) => (
        <Button onClick={() => setArticuloElegido(articulo)} size="small">
          Agregar
        </Button>
      ),
    },
  ];

  return (
    <div className={styles["modal-agregar-articulo"]}>
      <h2>Agregar un articulo</h2>
      <form
        className={styles["form"]}
        onSubmit={() => {
          alert("Agregado");
          onClose();
        }}
      >
        <div className={styles["inputs"]}>
          <TextField label="Nombre del articulo" size="small" />
          <TablaDeDatos columnas={columnasTabla} filas={queryArticulos.data!} />
        </div>
        <Button variant="contained" type="submit" color="success">
          Agregar
        </Button>
      </form>
    </div>
  );
}
