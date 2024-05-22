import axios from "axios";

export const buscarDemandaHistorica = async () => {
  const { data } = await axios.get(`${URL_API}/demanda/historico`);
  return data;
};
