import { DemandaHistorica, PrediccionDemanda, TipoPeriodo } from "../tiposEntidades";
import axiosAPI from "../axiosAPI";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { PrediccionDemandaDTO, TipoPrediccion } from "./dto";

export const useDemandaHistorica = (articuloId: number | null, tipoPeriodo: TipoPeriodo | null) => {
  return useQuery({
    queryKey: ["demanda-historica", articuloId, tipoPeriodo],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<DemandaHistorica[]>(
          `/articulo/${articuloId}/demandasHistoricas/${tipoPeriodo!}`
        );
        return data;
      })(),
    enabled: !!articuloId && !!tipoPeriodo,
  });
};

export const usePrediccionDemanda = (dto: PrediccionDemandaDTO) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["prediccion", dto],
    queryFn: () =>
      (async () => {
        console.log("SOLICITANDO", dto);
        const { data } = await axiosAPI.post<PrediccionDemanda[]>(`/ventas/prediccionDemanda`, dto);
        console.log("RESP", data);
        queryClient.invalidateQueries({
          queryKey: ["demanda-historica", dto.articuloId, dto.tipoPeriodo],
        });
        return data;
      })(),
    retry: false,
    refetchInterval: false,
    placeholderData: keepPreviousData,
    enabled:
      !!dto.articuloId &&
      !!dto.tipoPeriodo &&
      !!dto.tipoPrediccion &&
      !!dto.cantidadPredicciones &&
      !!dto.numeroPeriodos &&
      !!dto.fechaDesdePrediccion &&
      (dto.tipoPrediccion === "PROM_MOVIL_PONDERADO"
        ? dto.ponderaciones?.length === dto.numeroPeriodos
        : true) &&
      (dto.tipoPrediccion === "EXPONENCIAL" ? !!dto.alpha : true),
  });
};

export type CalculoError = {
  error: number;
  nombreArticulo: string;
  fechaCalculoError: string;
  tipoPrediccion: TipoPrediccion;
};
export const useCalcularError = (articuloId: number | null) => {
  return useQuery({
    queryKey: ["calculo-error", articuloId],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<CalculoError[]>(
          `/ventas/calcularError?idArticulo=${articuloId}`
        );
        console.log("PREDICCION", data);
        return data;
      })(),
    enabled: !!articuloId,
  });
};
