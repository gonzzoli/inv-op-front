import { DemandaHistorica, PrediccionDemanda, TipoPeriodo } from "../tiposEntidades";
import axiosAPI from "../axiosAPI";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { PrediccionDemandaDTO } from "./dto";

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
        : true),
  });
};
