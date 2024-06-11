import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect } from "react";

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
  {
    texto: "Proveedores",
    url: "/proveedores",
  },
];

export default function PaginaInicio() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") navigate("/articulos");
  }, [location]);
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
