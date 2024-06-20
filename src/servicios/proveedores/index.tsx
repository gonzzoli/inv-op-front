import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";
import { Proveedor, ProveedorArticulo } from "../tiposEntidades";
import {
  CrearProveedorArticuloDTO,
  CrearProveedorDTO,
  EditarProveedorDTO,
  EliminarProveedorArticuloDTO,
} from "./dto";
import toast from "react-hot-toast";

export const useProveedores = (nombreBuscado: string) => {
  return useQuery({
    queryKey: ["proveedores"],
    queryFn: () =>
      (async (nombreBuscado: string) => {
        const { data } = await axiosAPI.get<Proveedor[]>(`/proveedores`);
        return data;
      })(nombreBuscado),
    placeholderData: keepPreviousData,
  });
};

export const useCrearProveedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearProveedorDTO) =>
      (async (dto: CrearProveedorDTO) => {
        const { data } = await axiosAPI.post<Proveedor>(`/proveedores/crear`, dto);
        return data;
      })(dto),
    onSuccess: () => {
      toast.success("Provedor creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

export const useEditarProveedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: EditarProveedorDTO) =>
      (async (dto: EditarProveedorDTO) => {
        const { data } = await axiosAPI.post<Proveedor>(`/proveedores`, dto);
        return data;
      })(dto),
    onSuccess: () => {
      toast.success("Provedor editado correctamente");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

export const useCrearProveedorArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearProveedorArticuloDTO) =>
      (async (dto: CrearProveedorArticuloDTO) => {
        const { data } = await axiosAPI.post<Proveedor>(`/proveedores/crearProveedorArticulo`, dto);
        return data;
      })(dto),
    onSuccess: () => {
      toast.success("Articulo agregado correctamente al proveedor.");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

export const useEliminarProveedorArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: EliminarProveedorArticuloDTO) =>
      (async (dto: EliminarProveedorArticuloDTO) => {
        const { data } = await axiosAPI.post<Proveedor>(`/proveedores`, dto);
        return data;
      })(dto),
    onSuccess: () => {
      toast.success("Articulo eliminado del proveedor.");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

export const useArticulosProveedor = (proveedorId: number) => {
  return useQuery({
    queryKey: ["proveedor"],
    queryFn: () =>
      (async (proveedorId: number) => {
        const { data } = await axiosAPI.get<ProveedorArticulo[]>(`/proveedores${proveedorId}`);
        return data;
      })(proveedorId),
    enabled: !!proveedorId,
  });
};
