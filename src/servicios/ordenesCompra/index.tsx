import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";
import { OrdenCompra } from "../tiposEntidades";
import { CrearOrdenCompraDTO } from "./dto";

export const useOrdenesCompra = () => {
  return useQuery({
    queryKey: ["ordenes"],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<OrdenCompra[]>(`/OrdenCompra/getall`);
        return data;
      })(),
  });
};

export const useCrearOrdenCompra = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearOrdenCompraDTO) =>
      (async () => {
        const { data } = await axiosAPI.post<OrdenCompra>(`/OrdenCompra/create`, dto);
        return data;
      })(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordenes"] });
    },
  });
};

export const useConfirmarOrdenCompra = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ordenCompraId: number) =>
      (async () => {
        const { data } = await axiosAPI.get<OrdenCompra>(
          `/OrdenCompra/confirmarOrden?id=${ordenCompraId}`
        );
        return data;
      })(),
    onSuccess(_res, _dto) {
      queryClient.invalidateQueries({ queryKey: ["ordenes-compra"] });
    },
  });
};
