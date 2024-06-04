import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

const linksHeader = [
  {
    texto: "Ventas",
    url: "/ventas",
  },
  {
    texto: "Historial de demanda",
    url: "/demanda",
  },
  {
    texto: "Articulos",
    url: "/articulos",
  },
  {
    texto: "Ordenes",
    url: "/ordenes",
  },
];

export default function PaginaInicio() {
  const location = useLocation();
  return (
    <div className={styles["contenedor-pantalla"]}>
      <div className={styles["header"]}>
        {linksHeader.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className={styles["link-header"]}
            style={{
              textDecoration: link.url === location.pathname ? "underline" : "none",
            }}
          >
            {link.texto}
          </Link>
        ))}
      </div>
      <div className={styles["contenedor-outlet"]}>
        <Outlet />
      </div>
    </div>
  );
}
