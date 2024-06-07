import axios from "axios";
import { DemandaHistorica } from "./tiposEntidades";

export const buscarDemandaHistorica = async () => {
  const { data } = await axios.get<DemandaHistorica[]>(`${URL_API}/demanda/historico`);
  return data;
};
