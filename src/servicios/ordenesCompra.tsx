import { useQuery } from "@tanstack/react-query";
import axiosAPI from "./axiosAPI";
import { OrdenCompra } from "./tiposEntidades";

const buscarOrdenesCompra = async () => {
    const { data } = await axiosAPI.get<OrdenCompra[]>(`/OrdenCompra`);
    return data;
  };
  
  export const useOrdenesCompra = () => {
    return useQuery({
      queryKey: ["ordenes"],
      queryFn: () => buscarOrdenesCompra(),
    });
  };
  