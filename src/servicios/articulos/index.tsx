import { Articulo, ModeloInventario } from "../tiposEntidades";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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

export const useModelosInventario = () => {
  return useQuery({
    queryKey: ["modelos-inventario"],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<string[]>(`/articulo/getTiposInventario`);
        console.log("DADA", data)
        return data;
      })(),
    refetchInterval: false,
  });
};
