import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Button, IconButton, TextField } from "@mui/material";
import {
  useCrearProveedorArticulo,
  useElegirProveedorArticuloPredeterminado,
} from "@servicios/proveedores";
import { useDebounceValue } from "usehooks-ts";
import {
  ResArticulosDeProveedor,
  useArticulos,
  useArticulosDeProveedor,
} from "@servicios/articulos";
import TablaDeDatos, { PropsTablaDeDatos } from "@src/componentes/Tabla";
import { Articulo, Proveedor } from "@src/servicios/tiposEntidades";
import { Add } from "@mui/icons-material";
import { CrearProveedorArticuloDTO } from "@src/servicios/proveedores/dto";
import toast from "react-hot-toast";

export default function ModalCrearProveedorArticulo({
  onClose,
  proveedor,
}: {
  onClose: () => void;
  proveedor: Proveedor;
}) {
  const mtnCrearProveedorArticulo = useCrearProveedorArticulo();
  const [nombreBuscado, setNombreBuscado] = useDebounceValue("", 200);
  const queryArticulos = useArticulos(nombreBuscado);
  const queryArticulosDeProveedor = useArticulosDeProveedor(proveedor.id);
  const mtnActualizarProveedorPredeterminado = useElegirProveedorArticuloPredeterminado();

  const { control, handleSubmit, watch, setValue } = useForm<CrearProveedorArticuloDTO>({
    defaultValues: { proveedorId: proveedor.id, nivelDeServicio: 1.65, anoCalculo: 2024 },
  });

  const columnasTablaArticulos: PropsTablaDeDatos<Articulo>["columnas"] = [
    {
      nombreMostrado: "Articulos",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "Añadir",
      elementoMostrado: (articulo) => (
        <IconButton
          color="success"
          onClick={() => {
            setValue("articuloId", articulo.id);
          }}
        >
          <Add />
        </IconButton>
      ),
    },
  ];

  const columnasTablaArticulosProveedor: PropsTablaDeDatos<ResArticulosDeProveedor>["columnas"] = [
    {
      nombreMostrado: "Articulo",
      elementoMostrado: (articulo) => articulo.nombre,
    },
    {
      nombreMostrado: "CGI",
      elementoMostrado: (articulo) => articulo.cgi,
    },
    {
      nombreMostrado: "Lote Optimo",
      elementoMostrado: (articulo) => articulo.q,
    },
    {
      nombreMostrado: "Stock Seguridad",
      elementoMostrado: (articulo) => articulo.stockSeguridad,
    },
    {
      nombreMostrado: "Punto pedido",
      elementoMostrado: (articulo) => articulo.pp,
    },
    {
      nombreMostrado: "Acciones",
      elementoMostrado: (articulo) => (
        <div>
          <Button
            disabled={articulo.esPredeterminado}
            onClick={() =>
              mtnActualizarProveedorPredeterminado.mutate(articulo.idProveedorArticulo, {
                onSuccess: () => {
                  toast.success("Se actualizo el proveedor predeterminado.");
                  onClose();
                },
              })
            }
            size="small"
            color="info"
            variant="contained"
          >
            Predeterminado
          </Button>
        </div>
      ),
    },
  ];

  if (!queryArticulos.isSuccess || !queryArticulosDeProveedor.isSuccess) return null;

  return (
    <>
      <div className={styles["modal-crear"]}>
        <h2>Articulos del proveedor</h2>
        {!watch("articuloId") && (
          <div className={styles["articulos-proveedor"]}>
            {queryArticulosDeProveedor.data.length > 0 && (
              <TablaDeDatos
                columnas={columnasTablaArticulosProveedor}
                filas={queryArticulosDeProveedor.data}
              />
            )}
          </div>
        )}

        <form
          className={styles["form"]}
          onSubmit={handleSubmit((dto) =>
            mtnCrearProveedorArticulo.mutate(dto, {
              onSuccess: () => {
                toast.success("Articulo agregado al proveedor");
                onClose();
              },
            })
          )}
        >
          {!watch("articuloId") ? (
            <div className={styles["contenedor-tablas"]}>
              <h4>Seleccionar articulo</h4>
              <TextField
                label="Nombre del articulo"
                size="small"
                onChange={(e) => setNombreBuscado(e.target.value)}
              />
              <TablaDeDatos
                columnas={columnasTablaArticulos}
                filas={queryArticulos.data
                  .filter(
                    (articulo) =>
                      !queryArticulosDeProveedor.data.find(
                        (articuloProveedor) => articulo.id === articuloProveedor.idArticulo
                      )
                  )
                  .slice(0, 10)}
              />
            </div>
          ) : (
            <div className={styles["contenedor-inputs"]}>
              <p>
                <strong>Articulo: </strong>
                {
                  queryArticulos.data.find((articulo) => articulo.id === watch("articuloId"))!
                    .nombre
                }
              </p>
              <Controller
                control={control}
                name="demora"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Demora"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
              <Controller
                control={control}
                name="costoPedido"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Costo de pedido"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
              <Controller
                control={control}
                name="precioPorUnidad"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Precio por unidad"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
              <p>
                <strong>Nivel de servicio: </strong> {watch("nivelDeServicio")}{" "}
              </p>
              <p>
                <strong>Modelo de inventario: </strong>{" "}
                {
                  queryArticulos.data.find((articulo) => articulo.id === watch("articuloId"))
                    ?.modeloInventario
                }{" "}
              </p>
              {queryArticulos.data.find((articulo) => articulo.id === watch("articuloId"))
                ?.modeloInventario === "INTERVALO_FIJO" && (
                <Controller
                  control={control}
                  name="periodoDeRevision"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size="small"
                      label="Periodo de revisión"
                      value={value}
                      onChange={(e) => {
                        if (Number(e.currentTarget.value) < 0) return;
                        onChange(Number(e.currentTarget.value));
                      }}
                      type="number"
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name="anoCalculo"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    size="small"
                    label="Año para calculos de inventario"
                    value={value}
                    onChange={(e) => {
                      if (Number(e.currentTarget.value) < 0) return;
                      onChange(Number(e.currentTarget.value));
                    }}
                    type="number"
                  />
                )}
              />
            </div>
          )}

          <Button variant="contained" type="submit" color="success">
            Confirmar
          </Button>
        </form>
      </div>
    </>
  );
}
