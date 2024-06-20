import { OrdenCompra } from "@src/servicios/tiposEntidades";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { useConfirmarOrdenCompra } from "@src/servicios/ordenesCompra";
import toast from "react-hot-toast";

export default function ModalConfirmarOrdenCompra({
  onClose,
  ordenCompra,
}: {
  onClose: () => void;
  ordenCompra: OrdenCompra;
}) {
  const mtnConfirmarOrdenCompra = useConfirmarOrdenCompra();

  return (
    <div className={styles["modal-eliminar"]}>
      <h2>Confirmar llegada orden de compra</h2>
      <p>
        <strong>Proveedor:</strong>
        {ordenCompra.proveedor.nombre}
      </p>
      <p>
        <strong>Articulo:</strong>
        {ordenCompra.articulo.nombre}
      </p>
      <p>
        <strong>Cantidad:</strong>
        {ordenCompra.cantidad}
      </p>

      <p>¿Seguro que desea confirmar la llegada de la orden?</p>
      <div className={styles["botones"]}>
        <Button color="info" onClick={onClose} variant="contained">
          No, volver
        </Button>
        <Button
          color="success"
          onClick={() =>
            mtnConfirmarOrdenCompra.mutate(ordenCompra.id, {
              onSuccess: () => {
                toast.success("Llegada de orden confirmada");
                onClose();
              },
            })
          }
          variant="contained"
        >
          Si, confirmar
        </Button>
      </div>
    </div>
  );
}
