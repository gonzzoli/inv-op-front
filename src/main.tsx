import React from 'react'
import ReactDOM from 'react-dom/client'
import PaginaOrdenesDeCompra from './paginas/OrdenCompra/index.tsx'
import PaginaInicio from './paginas/Inicio/index.tsx'
import PaginaHistorialDemanda from './paginas/Demanda/Historial/index.tsx'
import PaginaPrediccionDemanda from './paginas/Demanda/Prediccion/index.tsx'
import PaginaArticulos from './paginas/Articulos/index.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PaginaInicio />
    )
  },
  {
    path: "/demanda/historial",
    element: (
      <PaginaHistorialDemanda />
    )
  },
  {
    path: "/demanda/prediccion",
    element: (
      <PaginaPrediccionDemanda />
    )
  },
  {
    path: "/ordenes",
    element: (
      <PaginaOrdenesDeCompra />
    )
  },
  {
    path: "/articulos",
    element: (
      <PaginaArticulos />
    )
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
