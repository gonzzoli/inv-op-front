import styles from "./styles.module.scss";

type ColumnasTablaDeDatos<T> = {
  visible: boolean;
  nombreMostrado: string;
  elementoMostrado: (fila: T) => React.ReactNode;
};

export type PropsTablaDeDatos<T> = {
  columnas: ColumnasTablaDeDatos<T>[];
  filas: T[];
};

const TablaDeDatos = <T,>({ columnas, filas }: PropsTablaDeDatos<T>) => {
  return (
    <div className={styles["contenedor-smart-list"]}>
      <table className={styles["tabla"]}>
        <thead>
          <tr>
            {columnas.map((columna, indice) => (
              <th key={indice}>
                <div>
                  <p className={styles["texto-header"]}>{columna.nombreMostrado}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, indiceFila) => (
            <tr className={styles["fila"]} key={indiceFila}>
              {columnas.map((columna, indiceColumna) => (
                <td key={indiceColumna}>
                  <div className={`${styles["celda"]}`}>{columna.elementoMostrado(fila)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDeDatos;
