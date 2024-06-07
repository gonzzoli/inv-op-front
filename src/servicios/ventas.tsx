import { useQuery } from "@tanstack/react-query";
import axiosAPI from "./axiosAPI";
import { Venta } from "./tiposEntidades";

const buscarVentas = async () => {
  const { data } = await axiosAPI.get<Venta[]>(`/Ventas`);
  return data;
};

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: () => buscarVentas(),
  });
};
