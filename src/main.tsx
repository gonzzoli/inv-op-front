import React from "react";
import ReactDOM from "react-dom/client";
import PaginaOrdenesDeCompra from "./paginas/OrdenCompra/index.tsx";
import PaginaInicio from "./paginas/Inicio/index.tsx";
import PaginaDemanda from "./paginas/Demanda/index.tsx";
import PaginaArticulos from "./paginas/Articulos/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles.css"
import PaginaVentas from "./paginas/Ventas/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaginaInicio />,
    children: [
      {
        path: "/demanda",
        element: <PaginaDemanda />,
      },
      {
        path: "/ordenes",
        element: <PaginaOrdenesDeCompra />,
      },
      {
        path: "/articulos",
        element: <PaginaArticulos />,
      },
      {
        path: "/ventas",
        element: <PaginaVentas />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
