import { Articulo, EstadoArticulo, ModeloInventario } from "../tiposEntidades";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";

export const useArticulos = (nombre: string) => {
  return useQuery({
    queryKey: ["articulos", nombre],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<Articulo[]>(`/articulo/buscar?filtro=${nombre}`);
        return data;
      })(),
    placeholderData: keepPreviousData,
  });
};

export const useCrearArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articulo: Omit<Articulo, "id">) =>
      (async () => {
        const { data } = await axiosAPI.post<Articulo>(`/articulo`, articulo);
        return data;
      })(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articulos"] });
    },
  });
};

export const useEditarArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articulo: Articulo) =>
      (async () => {
        const { data } = await axiosAPI.put<Articulo>(`/articulo/${articulo.id}`, articulo);
        return data;
      })(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articulos"] });
    },
  });
};

export type ResArticulosDeProveedor = {
  costoAlmacenamiento: number;
  nombre: string;
  stockActual: number;
  estadoArticulo: EstadoArticulo | null;
  modeloInventario: ModeloInventario | null;
  demoraPromedio: number;
  cgi: number;
  esPredeterminado: boolean;
  idProveedorArticulo: number;
  idArticulo: number;
  idProveedor: number;
};
export const useArticulosDeProveedor = (proveedorId: number) => {
  return useQuery({
    queryKey: ["proveedor", proveedorId, "articulos"],
    queryFn: () =>
      (async () => {
        try {
          const { data } = await axiosAPI.get<ResArticulosDeProveedor[]>(
            `/proveedorArticulo/articulosxproveedor/${proveedorId}`
          );
          console.log("PROVOSDOS", data);
          return data;
        } catch (error) {
          return [];
        }
      })(),
    retry: false,
    placeholderData: keepPreviousData,
  });
};

export const useModelosInventario = () => {
  return useQuery({
    queryKey: ["modelos-inventario"],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<string[]>(`/articulo/getTiposInventario`);
        console.log("DADA", data);
        return data;
      })(),
    refetchInterval: false,
  });
};
