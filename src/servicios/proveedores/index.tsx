import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";
import { EstadoArticulo, ModeloInventario, Proveedor, ProveedorArticulo } from "../tiposEntidades";
import {
  CrearProveedorArticuloDTO,
  CrearProveedorDTO,
  EditarProveedorDTO,
  EliminarProveedorArticuloDTO,
} from "./dto";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export const useProveedores = (nombreBuscado = "") => {
  return useQuery({
    queryKey: ["proveedores", nombreBuscado],
    queryFn: () =>
      (async (nombreBuscado: string) => {
        console.log(nombreBuscado);
        // no me funcionaba buscar por nombre
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

export const useElegirProveedorArticuloPredeterminado = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (proveedorArticuloId: number) =>
      (async (proveedorArticuloId: number) => {
        const { data } = await axiosAPI.put<Proveedor>(
          `/proveedores/proveedorPredeterminado/${proveedorArticuloId}`
        );
        return data;
      })(proveedorArticuloId),
    onSuccess: (_res, proveedorId) => {
      toast.success("Provedor editado correctamente");
      queryClient.invalidateQueries({ queryKey: ["proveedores", proveedorId, "articulos"] });
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};

export const useCrearProveedorArticulo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearProveedorArticuloDTO) =>
      (async (dto: CrearProveedorArticuloDTO) => {
        console.log(dto);
        const { data } = await axiosAPI.post<Proveedor>(`/proveedores/crearProveedorArticulo`, {
          L: dto.demora,
          T: dto.periodoDeRevision,
          Z: dto.nivelDeServicio,
          idArticulo: dto.articuloId,
          idProveedor: dto.proveedorId,
          costoPedido: dto.costoPedido,
          year: dto.anoCalculo,
          precioUnidad: dto.precioPorUnidad,
        });
        return data;
      })(dto),
    onSuccess: () => {
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
