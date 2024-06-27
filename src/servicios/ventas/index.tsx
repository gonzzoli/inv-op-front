import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../axiosAPI";
import { TipoPeriodo, Venta } from "../tiposEntidades";
import { CrearVentaDTO } from "./dto";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<Venta[]>(`/ventas`);
        return data;
      })(),
  });
};

export const useVentasPorArticulo = (articuloId: number) => {
  return useQuery({
    queryKey: ["ventas", articuloId],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<Venta[]>(`/ventas/articulos/${articuloId}`);
        console.log(data);
        return data;
      })(),
    enabled: !!articuloId,
  });
};

export type DemandaPorPeriodo = {
  clavePeriodo: string;
  fechaInicioPeriodo: Dayjs;
  fechaFinPeriodo: Dayjs;
  cantidadVendida: number;
};
export const useDemandaHistoricaPorArticuloPeriodo = (
  articuloId: number,
  tipoPeriodo: TipoPeriodo
) => {
  return useQuery({
    queryKey: ["demanda-historica", articuloId, tipoPeriodo],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<Venta[]>(`/ventas/articulos/${articuloId}`);
        const PERIODO_MAP: Record<TipoPeriodo, number> = {
          MENSUAL: 1,
          BIMESTRAL: 2,
          TRIMESTRAL: 3,
          SEMESTRAL: 6,
          ANUAL: 12,
        };
        const longitudPeriodo = PERIODO_MAP[tipoPeriodo];
        const demandasPorPeriodo = data.reduce<DemandaPorPeriodo[]>((acc, v) => {
          const mes = dayjs(v.fechaHoraAlta).get("month");
          const ano = dayjs(v.fechaHoraAlta).get("year");
          const indicePeriodo = Math.floor(mes / longitudPeriodo);
          const clavePeriodo = `${ano}-${indicePeriodo}`;

          const indicePeriodoExistente = acc.findIndex(
            (periodo) => periodo.clavePeriodo === clavePeriodo
          );

          if (indicePeriodoExistente === -1)
            acc.push({
              fechaInicioPeriodo: dayjs()
                .set("year", ano)
                .set("month", indicePeriodo * longitudPeriodo)
                .set("date", 1),
              fechaFinPeriodo: dayjs()
                .set("year", ano)
                .set("month", indicePeriodo * longitudPeriodo + longitudPeriodo - 1)
                .set(
                  "date",
                  dayjs()
                    .set("month", indicePeriodo * longitudPeriodo + longitudPeriodo - 1)
                    .endOf("month")
                    .date()
                ),
              cantidadVendida: v.cantidad,
              clavePeriodo: clavePeriodo,
            });
          else acc[indicePeriodoExistente].cantidadVendida += v.cantidad;

          return acc;
        }, []);
        console.log(data, demandasPorPeriodo);
        return demandasPorPeriodo;
      })(),
    enabled: !!articuloId && !!tipoPeriodo,
    placeholderData: keepPreviousData,
    refetchInterval: false,
  });
};

export const useCrearVenta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearVentaDTO) =>
      (async (dto: CrearVentaDTO) => {
        const { data } = await axiosAPI.post<Venta>(`/ventas/createVenta`, dto);
        return data;
      })(dto),
    onSuccess: () => {
      toast.success("Venta creada correctamente");
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
    },
  });
};
