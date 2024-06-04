import styles from "./styles.module.scss";
import { Button } from "@mui/material";

export default function ModalEliminarArticulo({
  onClose,
  articulo,
}: {
  onClose: () => void;
  articulo: { nombre: string; stockActual: number };
}) {
  return (
    <div className={styles["modal-eliminar-articulo"]}>
      <h2>Eliminar un articulo</h2>
      <h4>{articulo.nombre}</h4>

      <p>¿Seguro que desea eliminar el articulo?</p>
      <div className={styles["botones"]}>
        <Button color="info" onClick={onClose} variant="contained">
          No, volver
        </Button>
        <Button color="error" onClick={() => alert("Eliminado")} variant="contained">
          Si, eliminar
        </Button>
      </div>
    </div>
  );
}
