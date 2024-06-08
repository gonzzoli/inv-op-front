import { Articulo } from "../tiposEntidades";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";

const buscarArticulos = async (nombre: string) => {
  const { data } = await axiosAPI.get<Articulo[]>(`/articulo/buscar?nombre=${nombre}`);
  return data;
};

export const useArticulos = (nombre: string) => {
  return useQuery({
    queryKey: ["articulos"],
    queryFn: () => buscarArticulos(nombre),
    enabled: !!nombre,
    placeholderData: keepPreviousData
  });
};
