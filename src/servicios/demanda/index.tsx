import { DemandaHistorica } from "../tiposEntidades";
import axiosAPI from "../axiosAPI";
import { useQuery } from "@tanstack/react-query";

const buscarDemandaHistorica = async () => {
  const { data } = await axiosAPI.get<DemandaHistorica[]>(`/DemandaHistorica`);
  return data;
};

export const useDemandaHistorica = () => {
  return useQuery({
    queryKey: ["demanda-historica"],
    queryFn: () => buscarDemandaHistorica(),
  });
};

