import { Articulo, DemandaHistorica, TipoPeriodoDemanda } from "../tiposEntidades";
import axiosAPI from "../axiosAPI";
import { useQuery } from "@tanstack/react-query";

export const useDemandaHistorica = (
  articulo: Articulo | null,
  tipoPeriodo: TipoPeriodoDemanda | null
) => {
  return useQuery({
    queryKey: ["demanda-historica"],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<DemandaHistorica[]>(
          `/DemandaHistorica/${articulo!.id}`
        );
        return data;
      })(),
    enabled: !!articulo && !!tipoPeriodo,
  });
};

export const useTiposPeriodoDemanda = () => {
  return useQuery({
    queryKey: ["demanda-historica", "tipos-periodo"],
    queryFn: () =>
      (async () => {
        const { data } = await axiosAPI.get<TipoPeriodoDemanda[]>("/demanda/periodos");
        return data;
      })(),
  });
};
