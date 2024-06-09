import { Button } from "@mui/material";
import styles from "./styles.module.scss";
import { ProveedorArticulo } from "../../servicios/tiposEntidades";
import { useEliminarProveedorArticulo } from "../../servicios/proveedores";

export default function ModalEliminarArticulo({
  onClose,
  proveedorArticulo,
}: {
  onClose: () => void;
  proveedorArticulo: ProveedorArticulo;
}) {
  const mtnEliminarProveedorArticulo = useEliminarProveedorArticulo();

  return (
    <div className={styles["modal-eliminar-articulo"]}>
      <h2>Eliminar un articulo</h2>
      <Button variant="contained" color="success">
        No, volver
      </Button>
      <Button
        onClick={() =>
          mtnEliminarProveedorArticulo.mutate(
            { proveedorArticuloId: proveedorArticulo.id },
            { onSuccess: onClose }
          )
        }
        variant="contained"
        color="error"
      >
        Si, eliminar
      </Button>
    </div>
  );
}
