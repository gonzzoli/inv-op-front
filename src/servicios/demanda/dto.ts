import { TipoPeriodo } from "../tiposEntidades";

export type TipoPrediccion = "PROM_MOVIL" | "PROM_MOVIL_PONDERADO" | "EXPONENCIAL";

export type PrediccionDemandaDTO = {
  numeroPeriodos: number;
  tipoPeriodo: TipoPeriodo;
  fechaDesdePrediccion: string;
  articuloId: number;
  tipoPrediccion: TipoPrediccion;
  cantidadPredicciones: number;
  ponderaciones?: number[];
  alpha?: number;
};
