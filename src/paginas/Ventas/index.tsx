import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import TablaDeDatos, { PropsTablaDeDatos } from "../../componentes/Tabla";
import ModalCrearVenta from "./ModalCrearVenta";
import { Venta } from "../../servicios/tipos";

export default function PaginaVentas() {
  const [nombreBuscado, setNombreBuscado] = useState<string>("");
  const [creandoVenta, setCreandoVenta] = useState<boolean>(false);

  const columnasTabla: PropsTablaDeDatos<Venta>["columnas"] = [
    {
      nombreMostrado: "Nombre",
      elementoMostrado: (venta) => venta.nombreArticulo,
    },
    {
      nombreMostrado: "Cantidad",
      elementoMostrado: (venta) => venta.cantidad,
    },
    {
      nombreMostrado: "Fecha",
      elementoMostrado: (venta) => venta.fecha.toDateString(),
    },
  ];

  return (
    <>
      <Modal open={creandoVenta} onClose={() => setCreandoVenta(false)}>
        <ModalCrearVenta onClose={() => setCreandoVenta(false)} />
      </Modal>
      <div className={styles["contenedor-pantalla"]}>
        <div className={styles["buscador-boton"]}>
          <TextField
            onChange={(e) => setNombreBuscado(e.target.value)}
            label="Buscar por articulo"
            variant="outlined"
            size="small"
          />
          <Button onClick={() => setCreandoVenta(true)} variant="contained" color="success">
            Crear venta
          </Button>
        </div>
        <div className={styles["contenedor-tabla"]}>
          <TablaDeDatos
            columnas={columnasTabla}
            filas={[
              { articuloId: 1, nombreArticulo: "zapatillas", cantidad: 10, fecha: new Date() },
            ]}
          />
        </div>
      </div>
    </>
  );
}
