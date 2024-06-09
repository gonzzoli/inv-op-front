import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import ModalCrearVenta from "./ModalCrearVenta";
import { Venta } from "../../servicios/tiposEntidades";
import { useVentas } from "../../servicios/ventas";

export default function PaginaVentas() {
  const queryVentas = useVentas();
  const [creandoVenta, setCreandoVenta] = useState<boolean>(false);

  const columnasTabla: PropsTablaDeDatos<Venta>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (venta) => venta.articulo.nombre,
    },
    {
      nombreMostrado: "Cantidad",
      elementoMostrado: (venta) => venta.cantidad,
    },
    {
      nombreMostrado: "Fecha",
      elementoMostrado: (venta) => venta.fechaHoraAlta,
    },
  ];

  if (!queryVentas.isSuccess) return <h1>Cargando...</h1>;

  return (
    <>
      <Modal open={creandoVenta} onClose={() => setCreandoVenta(false)}>
        <ModalCrearVenta onClose={() => setCreandoVenta(false)} />
      </Modal>
      <div className={styles["contenedor-pantalla"]}>
        <div className={styles["buscador-boton"]}>
          <Button onClick={() => setCreandoVenta(true)} variant="contained" color="success">
            Crear venta
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          <TablaDeDatos columnas={columnasTabla} filas={queryVentas.data!} />
        </div>
      </div>
    </>
  );
}
