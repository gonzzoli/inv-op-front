import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";
import { Venta } from "../tiposEntidades";
import { CrearVentaDTO } from "./dto";
import toast from "react-hot-toast";

const buscarVentas = async () => {
  const { data } = await axiosAPI.get<Venta[]>(`/ventas`);
  return data;
};

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: () => buscarVentas(),
  });
};

const crearVenta = async (dto: CrearVentaDTO) => {
  const { data } = await axiosAPI.post<Venta>(`/ventas/createVenta`, dto);
  return data;
};

export const useCrearVenta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearVentaDTO) => crearVenta(dto),
    onSuccess: () => {
      toast.success("Venta creada correctamente")
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
    },
  });
};
