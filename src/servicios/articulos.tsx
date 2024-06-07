import { Articulo } from "./tiposEntidades";
import { useQuery } from "@tanstack/react-query";
import axiosAPI from "./axiosAPI";

const buscarArticulos = async () => {
  const { data } = await axiosAPI.get<Articulo[]>(`/articulos`);
  return data;
};

export const useArticulos = () => {
  return useQuery({
    queryKey: ["articulos"],
    queryFn: () => buscarArticulos(),
  });
};
