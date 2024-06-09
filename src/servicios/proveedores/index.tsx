import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";
import { Proveedor } from "../tiposEntidades";
import { CrearProveedorDTO } from "./dto";
import toast from "react-hot-toast";

const buscarProveedores = async (nombreBuscado: string) => {
  const { data } = await axiosAPI.get<Proveedor[]>(`/proveedores?filtroNombre=${nombreBuscado}`);
  return data;
};

export const useProveedores = (nombreBuscado: string) => {
  return useQuery({
    queryKey: ["proveedores"],
    queryFn: () => buscarProveedores(nombreBuscado),
    enabled: !!nombreBuscado,
    placeholderData: keepPreviousData,
  });
};

const crearProveedor = async (dto: CrearProveedorDTO) => {
  const { data } = await axiosAPI.post<Proveedor>(`/proveedores`, dto);
  return data;
};

export const useCrearProveedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearProveedorDTO) => crearProveedor(dto),
    onSuccess: () => {
      toast.success("Provedor creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};
