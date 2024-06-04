import axios from "axios";
import { Articulo } from "./tipos";

export const buscarArticulosPorNombre = async (nombre?: string) => {
  try {
    const { data } = await axios.get<Articulo[]>(URL_API + `${nombre ? "?nombre=" + nombre : ""}`);
    return data;
  } catch (error) {
    console.log("ERROOOORRRR", error);
    return [];
  }
};
