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

const editarProveedor = async (dto: EditarProveedorDTO) => {
  const { data } = await axiosAPI.post<Proveedor>(`/proveedores`, dto);
  return data;
};

export const useEditarProveedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: EditarProveedorDTO) => editarProveedor(dto),
    onSuccess: () => {
      toast.success("Provedor editado correctamente");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

const crearProveedorArticulo = async (dto: CrearProveedorArticuloDTO) => {
  const { data } = await axiosAPI.post<Proveedor>(`/proveedores`, dto);
  return data;
};

export const useCrearProveedorArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearProveedorArticuloDTO) => crearProveedorArticulo(dto),
    onSuccess: () => {
      toast.success("Articulo agregado correctamente al proveedor.");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

const eliminarProveedorArticulo = async (dto: EliminarProveedorArticuloDTO) => {
  const { data } = await axiosAPI.post<Proveedor>(`/proveedores`, dto);
  return data;
};

export const useEliminarProveedorArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: EliminarProveedorArticuloDTO) => eliminarProveedorArticulo(dto),
    onSuccess: () => {
      toast.success("Articulo eliminado del proveedor.");
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

const buscarArticulosProveedor = async (proveedorId: number) => {
  const { data } = await axiosAPI.get<ProveedorArticulo[]>(`/proveedores${proveedorId}`);
  return data;
};

export const useArticulosProveedor = (proveedorId: number) => {
  return useQuery({
    queryKey: ["proveedor"],
    queryFn: () => buscarArticulosProveedor(proveedorId),
    enabled: !!proveedorId,
  });
};
