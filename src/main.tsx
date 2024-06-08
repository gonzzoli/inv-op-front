import React from "react";
import ReactDOM from "react-dom/client";
import PaginaOrdenesDeCompra from "./paginas/OrdenCompra/index.tsx";
import PaginaInicio from "./paginas/Inicio/index.tsx";
import PaginaDemanda from "./paginas/Demanda/index.tsx";
import PaginaArticulos from "./paginas/Articulos/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles.css";
import PaginaVentas from "./paginas/Ventas/index.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
