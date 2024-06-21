import { Button, Modal } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import { useOrdenesCompra } from "../../servicios/ordenesCompra";
import { OrdenCompra } from "../../servicios/tiposEntidades";
import styles from "./styles.module.scss";
import { useState } from "react";
import ModalCrearOrdenCompra from "./ModalCrearOrdenCompra";
import ModalConfirmarOrdenCompra from "./ModalConfirmarOrdenCompra";

export default function PaginaOrdenesDeCompra() {
  const queryOrdenes = useOrdenesCompra();
  const [creandoOrden, setCreandoOrden] = useState(false);
  const [confirmandoOrden, setConfirmandoOrden] = useState<OrdenCompra | null>(null);

  const columnasTabla: PropsTablaDeDatos<OrdenCompra>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (orden) => orden.articulo.nombre,
    },
    {
      nombreMostrado: "Cantidad",
      elementoMostrado: (orden) => orden.cantidad,
    },
    {
      nombreMostrado: "Estado",
      elementoMostrado: (orden) => orden.nombreEstado,
    },
    {
      nombreMostrado: "Fecha pedido",
      elementoMostrado: (orden) => orden.fechaHoraAlta.toLocaleString(),
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (orden) => (
        <Button disabled={orden.nombreEstado === "CONFIRMADO"} size="small" onClick={() => setConfirmandoOrden(orden)}>
          Confirmar
        </Button>
      ),
    },
  ];

  if (!queryOrdenes.isSuccess) return <h1>Cargando...</h1>;

  return (
    <>
      <Modal open={creandoOrden} onClose={() => setCreandoOrden(false)}>
        <ModalCrearOrdenCompra onClose={() => setCreandoOrden(false)} />
      </Modal>
      <Modal open={!!confirmandoOrden} onClose={() => setConfirmandoOrden(null)}>
        <ModalConfirmarOrdenCompra
          ordenCompra={confirmandoOrden!}
          onClose={() => setConfirmandoOrden(null)}
        />
      </Modal>
      <div className={styles["contenedor-pantalla"]}>
        <Button onClick={() => setCreandoOrden(true)} variant="contained" color="success">
          Crear orden de compra
        </Button>
        <div className={styles["contenedor-tabla"]}>
          <TablaDeDatos columnas={columnasTabla} filas={queryOrdenes.data!} />
        </div>
      </div>
    </>
  );
}
